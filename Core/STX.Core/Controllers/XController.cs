using System;
using System.Diagnostics;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;

namespace STX.Core.Controllers
{
    public class StopwatchAttribute : ActionFilterAttribute
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
            Console.WriteLine($"Ellapsed {stp?.Elapsed.TotalMilliseconds}ms {pContext.HttpContext.Request.Path}");
        }
    }

    [Stopwatch]
    public abstract class XController : ControllerBase
    {

        public XController(ILogger<XController> pLogger)
        {
            Log = pLogger;
        }

        protected readonly ILogger<XController> Log;
    }
}
