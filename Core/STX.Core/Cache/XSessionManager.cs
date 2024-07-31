using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

using STX.Core.IDs.Model;
using STX.Core.Interfaces;

namespace STX.Core.Cache
{
    public delegate Dictionary<string, XUser> XRefreshCache();
    public class XSessionManager
    {
        public static XILoginService _LoginService;

        public static void Initialize(IServiceProvider pServices)
        {
            _LoginService = pServices.GetService<XILoginService>();
        }

        public static XUserSession DoLogin(HttpContext pHttpContext, XUserLogin pLogin)
        {
            var usrsse = _LoginService.GetUser(pLogin.Login);
            if (usrsse.Session != null)
                return usrsse.Session;
            var ret = _LoginService.DoLogin(pHttpContext, usrsse.User);
            return ret;
        }

        public static bool CheckLogin(HttpContext pHttpContext)
        {
            ClaimsIdentity idt = pHttpContext.User.Identities.FirstOrDefault(i => i.IsAuthenticated);
            if (idt != null)
            {
                Claim clm = idt.Claims.FirstOrDefault(c => c.Type == XDefault.JWTKey);
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
