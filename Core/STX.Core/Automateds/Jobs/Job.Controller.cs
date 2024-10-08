//<auto-generated/>
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using STX.Core.Controllers;

namespace STX.Core.Automateds.Jobs
{
    [Route("STXCore/Automateds/Jobs/Job")]
    [ApiController]
    public class JobController : XController
    {
        public JobController(IJobService pService, ILogger<XController> pLogger)
               :base(pLogger)
        {
            _Service = pService;
        }

        private readonly IJobService _Service;

        [HttpPost("GetByPK")]
        public JobDataSet GetByPK([FromBody] JobRequest pRequest)
        {
            var dataset = _Service.Select(pRequest, null, true);
            return dataset;
        }

        [HttpPost("Flush")]
        public IActionResult Flush([FromBody] JobDataSet pDataSet)
        {
            _Service.Flush(pDataSet);
            return new OkResult();
        }

        [HttpPost("Search")]
        public JobDataSet Search([FromBody] JobFilter pFilter)
        {
            var dataset = _Service.Select(null, pFilter, false);
            return dataset;
        }
    }
}