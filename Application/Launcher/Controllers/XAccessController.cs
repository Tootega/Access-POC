using Microsoft.AspNetCore.Mvc;

using TFX.Access;
using TFX.Access.Authorize;
using TFX.Access.Cache;
using TFX.Access.Model;

namespace Launcher.Controllers
{
    [ApiController]
    [Route("Access")]
    public class XAccessController : ControllerBase
    {
        private readonly ILogger<XAccessController> _Logger;

        public XAccessController(ILogger<XAccessController> pLogger)
        {
            _Logger = pLogger;
        }

        static int _Count;
        static long _Start = -1;
        [HttpPost, Route("Login")]
        public IActionResult Login(XUserLogin pLogin)
        {
            //if (_Start == -1)
            //    _Start = DateTime.Now.Ticks;

            //_Count++;
            //Console.SetCursorPosition(10, 10);
            //var et = new TimeSpan(DateTime.Now.Ticks - _Start);
            //if (et.Seconds > 0)
            //    Console.WriteLine((_Count / et.TotalSeconds).ToString("#,##0"));
            var session = XSessionManager.DoLogin(HttpContext, pLogin);
            if (session == null)
                return Unauthorized(XTAFDefault.Unauthorized());
            return Ok(session);
        }

        [XAuthorizeFilter]
        [XAuthorize()]
        [HttpPost, Route("X21")]
        public ActionResult Test(Int32 x)
        {
            return Ok(true);
        }
    }
}
