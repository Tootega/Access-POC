using Microsoft.AspNetCore.Authorization;

namespace STX.Access.Authorize
{
    public class XAuthorizeAttribute : AuthorizeAttribute
    {
        public XAuthorizeAttribute()
        {
            AuthenticationSchemes = XTAFDefault.AuthenticationSchemes;
        }                      
    }
}
