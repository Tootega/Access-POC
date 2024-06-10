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
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            Stopwatch stopwatch = new Stopwatch();
            filterContext.HttpContext.Items["Stopwatch"] = stopwatch;

            stopwatch.Start();
        }

        public override void OnResultExecuted(ResultExecutedContext filterContext)
        {
            Stopwatch? stopwatch = (Stopwatch)filterContext.HttpContext.Items["Stopwatch"];
            stopwatch.Stop();

            HttpContext httpContext = filterContext.HttpContext;
            HttpResponse response = httpContext.Response;

           Console.WriteLine($"Ellapsed {stopwatch.Elapsed.TotalMilliseconds} {httpContext.Request.Path}");
        }
    }

    [Stopwatch]
    public abstract class XController : ControllerBase
    {

        public XController(ILogger<XController> pLogger)
        {
        }

        protected readonly ILogger<XController> Log;
    }
}
