using Microsoft.AspNetCore.Authorization;

namespace TFX.Access.Authorize
{
    public class XAuthorizeAttribute : AuthorizeAttribute
    {
        public XAuthorizeAttribute()
        {
            AuthenticationSchemes = XTAFDefault.AuthenticationSchemes;
        }                      
    }
}
