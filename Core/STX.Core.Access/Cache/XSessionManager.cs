using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;

using STX.Access.Model;

namespace STX.Access.Cache
{
    public class XSessionManager
    {
        public static XLoginOk DoLogin(HttpContext pHttpContext, XUserLogin pLogin)
        {
            var usr = XSessionCache.Users.GetUser(pLogin.Login);
            var ret = new XLoginOk();
            ret.ID = Guid.NewGuid();
            ret.UserID = usr.ID;
            List<Claim> claims = new List<Claim>(2);
            claims.Add(new Claim(XTAFDefault.AuthenticationSchemes, ret.ID.ToString()));
            ClaimsPrincipal cp = new ClaimsPrincipal(new ClaimsIdentity(claims, XTAFDefault.AuthenticationSchemes));
            AuthenticationProperties ap = new AuthenticationProperties();
            ap.ExpiresUtc = DateTime.UtcNow.AddMinutes(20);
            var task = pHttpContext.SignInAsync(XTAFDefault.AuthenticationSchemes, cp, ap);
            task.Wait();
            XSessionCache.AddSession(ret);
            return ret;
        }

        public static bool CheckLogin(HttpContext pHttpContext)
        {
            ClaimsIdentity idt = pHttpContext.User.Identities.FirstOrDefault(i => i.IsAuthenticated);
            if (idt != null)
            {
                Claim clm = idt.Claims.FirstOrDefault(c => c.Type == XTAFDefault.AuthenticationSchemes);
                if (clm != null)
                {
                    String key = clm.Value;
                    Guid execid;
                    Guid.TryParse(key, out execid);
                    return true;
                }
            }
            return false;
        }
    }
}
