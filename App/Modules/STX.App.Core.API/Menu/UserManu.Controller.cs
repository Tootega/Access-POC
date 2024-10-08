//<auto-generated/>
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using STX.Core.Controllers;

namespace STX.App.Core.INF.Menu
{
    [Route("STXAppCoreINF/Menu/UserManu")]
    [ApiController]
    public class UserManuController : XController
    {
        public UserManuController(IUserManuService pService, ILogger<XController> pLogger)
               :base(pLogger)
        {
            _Service = pService;
        }

        private readonly IUserManuService _Service;

        [HttpPost("GetByPK")]
        public UserManuDataSet GetByPK([FromBody] UserManuRequest pRequest)
        {
            var dataset = _Service.Select(pRequest, null, true);
            return dataset;
        }

        [HttpPost("Search")]
        public UserManuDataSet Search([FromBody] UserManuFilter pFilter)
        {
            var dataset = _Service.Select(null, pFilter, false);
            return dataset;
        }
    }
}