using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Text.Json;

using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;

using STX.Core.Cache;
using STX.Core.IDs.Model;
using STX.Core.Interfaces;

namespace STX.Core.IDs
{
	public class XLoginService : XILoginService
    {
		public Guid ID => throw new NotImplementedException();

		public string Name => throw new NotImplementedException();

		public void Dispose()
		{
		}

		public XUserSession DoLogin(HttpContext pHttpContext, XUser pUser)
        {
            var session = XSessionCache.GetSession(pUser.ID);
            if (session != null)
                return session;
            using var handler = new HttpClientHandler();
            handler.ClientCertificateOptions = ClientCertificateOption.Manual;
            handler.ServerCertificateCustomValidationCallback =
                (httpRequestMessage, cert, cetChain, policyErrors) =>
                {
                    return true;
                };
            using HttpClient client = new HttpClient(handler);
            try
            {

                using var st = new StringContent(JsonSerializer.Serialize(pUser), Encoding.UTF8, "application/json");
                using HttpResponseMessage response = client.PostAsync("https://tootegaws:5000/Access/Login", st).Result;
                response.EnsureSuccessStatusCode();
                var data = response.Content.ReadAsStringAsync().Result;
                XUserSession res = JsonSerializer.Deserialize<XUserSession>(data);
                if (res.SessionID.IsFull())
                {

                    List<Claim> claims = new List<Claim>(2);
                    claims.Add(new Claim(XDefault.JWTKey, data));
                    ClaimsPrincipal cp = new ClaimsPrincipal(new ClaimsIdentity(claims, XDefault.JWTKey));
                    AuthenticationProperties ap = new AuthenticationProperties();
                    ap.ExpiresUtc = DateTime.UtcNow.AddMinutes(20);
                    var task = pHttpContext.SignInAsync(XDefault.JWTKey, cp, ap);
                    task.Wait();
                    XSessionCache.AddSession(res, true);
                    return res;
                }
            }
            catch
            {
            }
            return new XUserSession();
        }

        public (XUser User, XUserSession Session) GetUser(string pLogin)
        {
            var session = XSessionCache.GetSession(pLogin);
            if (session != null)
                return (null, session);
            return (new XUser { Login = pLogin }, null);
        }
    }
}
