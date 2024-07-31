using System;
using System.Diagnostics;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;

using STX.Core.Authorize;

namespace STX.Core.Controllers
{
    public class XStopwatchAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext pContext)
        {
            Stopwatch stp = new Stopwatch();
            pContext.HttpContext.Items["Stopwatch"] = stp;
            stp.Start();
        }

        public override void OnResultExecuted(ResultExecutedContext pContext)
        {
            Stopwatch stp = pContext.HttpContext.Items["Stopwatch"] as Stopwatch;
            stp?.Stop();
            Console.WriteLine($"Ellapsed {stp?.Elapsed.TotalMilliseconds.ToString("#,##0.0")}ms {pContext.HttpContext.Request.Path}");
        }
    }

    [XStopwatch]
    [XAuthorizeFilter]
    public abstract class XController : ControllerBase
    {

        public XController(ILogger<XController> pLogger)
        {
            Log = pLogger;
        }

        protected readonly ILogger<XController> Log;
    }
}
