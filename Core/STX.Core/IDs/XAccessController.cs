using System;
using System.Diagnostics;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using STX.Core.Authorize;
using STX.Core.Cache;
using STX.Core.Controllers;
using STX.Core.IDs.Model;

namespace STX.Core.IDs
{
    [ApiController]
    [XStopwatch]
    [Route("Access")]
    public class XAccessController : ControllerBase
    {
        private readonly ILogger<XAccessController> _Logger;
        private static Process _Process;
        static DateTime _Alive = DateTime.Now;

        public XAccessController(ILogger<XAccessController> pLogger)
        {
            _Logger = pLogger;
            if (_Process == null)
                _Process = Process.GetCurrentProcess();
        }

        [HttpPost, Route("Login")]
        public IActionResult Login(XUserLogin pLogin)
        {
            var session = XSessionManager.DoLogin(HttpContext, pLogin);
            if (session == null)
                return Unauthorized(XDefault.Unauthorized());
            return Ok(session);
        }

        [HttpPost, Route("HealthCheck")]
        public ActionResult HealthCheck()
        {
            return Ok($"We alive since {_Alive} ({(DateTime.Now - _Alive)})");
        }
        [HttpPost, Route("X21")]
        [XAuthorizeFilter]
        //[XAuthorize()]
        public ActionResult X21()
        {
            return Ok($"We alive since {_Alive} ({(DateTime.Now - _Alive)})");
        }
        

    }
}
