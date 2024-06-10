using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

using STX.Access.Cache;

namespace STX.Access.Authorize
{
    public class XAuthorizeFilterAttribute : TypeFilterAttribute
    {
        public XAuthorizeFilterAttribute()
            : base(typeof(XAuthorizationFilter))
        {
        }

        public XAuthorizeFilterAttribute(params object[] claims)
            : base(typeof(XAuthorizationFilter))
        {
        }
    }

    public class XAuthorizationFilter : IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext pContext)
        {
            if (XSessionManager.CheckLogin(pContext.HttpContext))
                return;

            pContext.Result = new NotFoundResult();
        }
    }
}
