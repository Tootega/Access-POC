//<auto-generated/>
using System;
using System.Linq;
using STX.Core.Model;
using Microsoft.Extensions.DependencyInjection;
using STX.Core.Access.Usuarios;

namespace STX.Core.Access
{
    public class STXCoreAccessModule : XModule
    {
        public override void Initialize(IServiceCollection pServices)
        {
            pServices.AddScoped<IUsuariosAtivosService, UsuariosAtivosService>();
        }
    }
}