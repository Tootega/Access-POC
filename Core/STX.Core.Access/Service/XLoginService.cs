using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

using STX.Core.Access.Usuarios;
using STX.Core.Cache;
using STX.Core.Exceptions;
using STX.Core.IDs.Model;
using STX.Core.Interfaces;
using STX.Core.Services;
using Microsoft.AspNetCore.Http;
using System;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authentication;

namespace STX.Core.Access.Service
{
    public class XLoginService : XILoginService
    {
        private XCacheUser _Users = new XCacheUser();

        public Guid ID
        {
            get; set;
        }

        public string Name
        {
            get; set;
        }

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

            var issuer = "https://joydipkanjilal.com/";
            var audience = "https://joydipkanjilal.com/";
            var key = Encoding.UTF8.GetBytes("This is a sample secret key - please don't use in production environment.'");

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("Id", ret.SessionID.ToString()),
                    new Claim(JwtRegisteredClaimNames.Sub, pUser.Login),
                    new Claim(JwtRegisteredClaimNames.Email, pUser.Login),
                    new Claim(JwtRegisteredClaimNames.Jti,
                    Guid.NewGuid().ToString())
                }),
                Expires = DateTime.UtcNow.AddMinutes(5),
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature),
                Claims = GetData()
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = tokenHandler.WriteToken(token);
            var stringToken = tokenHandler.WriteToken(token);
            ret.Token = stringToken;
            XSessionCache.AddSession(ret);
            return ret;
        }

        private IDictionary<string, object> GetData()
        {
            var dic = new Dictionary<string, object>();
            dic.Add("sjdhjkshd", "dfjkhfdjkhd jkfhjkd f");
            return dic;
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

        public void Dispose()
        {
            Dispose(true);
        }

        protected virtual void Dispose(bool pDisposing)
        {
        }
    }
}
