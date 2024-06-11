//<auto-generated/>
using System;
using System.Linq;
using STX.Core.Model;
using Microsoft.Extensions.DependencyInjection;
using STX.App.Core.INF.Perfil;
using STX.App.Core.INF.Menu;

namespace STX.App.Core.INF
{
    public class STXAppCoreINFModule : XModule
    {
        public override void Initialize(IServiceCollection pServices)
        {
            pServices.AddScoped<IPerfilService, PerfilService>();
            pServices.AddScoped<IPerfilDireitoService, PerfilDireitoService>();
            pServices.AddScoped<IUserManuService, UserManuService>();
        }
    }
}