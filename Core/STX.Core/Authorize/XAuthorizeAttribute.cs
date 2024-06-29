using Microsoft.AspNetCore.Authorization;

namespace STX.Core.Authorize
{
    public class XAuthorizeAttribute : AuthorizeAttribute
    {
        public XAuthorizeAttribute()
        {
            AuthenticationSchemes = XDefault.AuthenticationSchemes;
        }                      
    }
}
