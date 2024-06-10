//<auto-generated/>
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using STX.Core.Controllers;

namespace STX.Core.Access.Usuarios
{


    [Route("STXCoreAccess/Usuarios/UsuariosAtivos")]
    [ApiController]
    public class UsuariosAtivosController : XController
    {
        public UsuariosAtivosController(UsuariosAtivosService pService, ILogger<XController> pLogger)
               :base(pLogger)
        {
            _Service = pService;
        }

        private readonly UsuariosAtivosService _Service;

        [HttpPost("GetByPK")]
        public UsuariosAtivosDataSet GetByPK([FromBody] UsuariosAtivosRequest pRequest)
        {
            var dataset = _Service.Select(pRequest, true);
            return dataset;
        }

        [HttpPost("Flush")]
        public IActionResult Flush([FromBody] UsuariosAtivosDataSet pDataSet)
        {
            _Service.Flush(pDataSet);
            return new OkResult();
        }


    }
}