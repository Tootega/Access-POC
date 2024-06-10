using System;
using System.Diagnostics;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using STX.Access;
using STX.Access.Authorize;
using STX.Access.Cache;
using STX.Access.Model;

namespace Launcher.Controllers
{
    [ApiController]
    [Route("Access")]
    public class XAccessController : ControllerBase
    {
        private readonly ILogger<XAccessController> _Logger;
        private static Process _Process;

        public XAccessController(ILogger<XAccessController> pLogger)
        {
            _Logger = pLogger;
            if (_Process == null)
                _Process = Process.GetCurrentProcess();
        }

        static int _Count;
        static long _Start = -1;
        static long _RAM;
        long _S10 = TimeSpan.TicksPerSecond * 10;

        [HttpPost, Route("Login")]
        public IActionResult Login(XUserLogin pLogin)
        {

            //_Count++;
            //Console.SetCursorPosition(10, 10);
            //var et = new TimeSpan(DateTime.Now.Ticks - _Start);
            //if (et.Seconds > 0)
            //    Console.WriteLine((_Count / et.TotalSeconds).ToString("#,##0"));
            if (_Start == -1 || DateTime.Now.Ticks - _Start > _S10)
            {
                string prcName = Process.GetCurrentProcess().ProcessName;
                _Start = DateTime.Now.Ticks;
#pragma warning disable CA2000 // Dispose objects before losing scope
                var counter = new PerformanceCounter("Process", "Working Set - Private", prcName);
#pragma warning restore CA2000 // Dispose objects before losing scope

                if (counter != null)
                {
                    _RAM = counter.RawValue / (1024 * 1024);
                }
            }
            var session = XSessionManager.DoLogin(HttpContext, pLogin);
            if (session == null)
                return Unauthorized(XTAFDefault.Unauthorized());
            else
                session.RAM = _RAM;
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
