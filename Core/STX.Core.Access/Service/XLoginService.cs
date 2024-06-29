using System;
using System.Collections.Generic;
using System.Security.Claims;

using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;

using STX.Core.Cache;
using STX.Core.Exceptions;
using STX.Core.IDs.Model;
using STX.Core.Interfaces;
using STX.Core.Model;
using STX.Core;
using STX.Core.Access.Usuarios;
using STX.Core.Services;

namespace STX.Core.Access.Service
{
    public class XLoginService : XILoginService
    {
        private XCacheUser _Users = new XCacheUser();

        public XUserSession DoLogin(HttpContext pHttpContext, XUser pUser)
        {
            var session = XSessionCache.GetSession(pUser.SessionID);
            if (session != null)
                return session;
            var usr = _Users.GetUser(pUser.Login);
            if (usr == null)
                throw new XUnconformity("Usuário con a credencial informada não existe.");
            var ret = new XUserSession();
            ret.SessionID = Guid.NewGuid();
            ret.UserID = usr.ID;
            ret.Login = usr.Login;
            List<Claim> claims = new List<Claim>(2);
            claims.Add(new Claim(XDefault.AuthenticationSchemes, ret.SessionID.ToString()));
            ClaimsPrincipal cp = new ClaimsPrincipal(new ClaimsIdentity(claims, XDefault.AuthenticationSchemes));
            AuthenticationProperties ap = new AuthenticationProperties();
            ap.ExpiresUtc = DateTime.UtcNow.AddMinutes(20);
            var task = pHttpContext.SignInAsync(XDefault.AuthenticationSchemes, cp, ap);
            task.Wait();
            XSessionCache.AddSession(ret);
            return ret;
        }

        public (XUser User, XUserSession Session) GetUser(string pLogin)
        {
            return (_Users.GetUser(pLogin), null);
        }

        public void RefreshCache(Dictionary<string, XUser> pUsers = null)
        {
            if (pUsers == null)
            {
                pUsers = new Dictionary<string, XUser>();
                using var srv = new UsuariosAtivosService((XService)null);
                var dst = srv.Select(null, null, true);
                foreach (var item in dst.Tuples)
                {
                    pUsers.Add(item.Login.Value, new XUser { ID = item.TAFxUsuarioID.Value, Login = item.Login.Value });
                }
            }
            lock (_Users)
                _Users.Swap(pUsers);
        }
    }
}
