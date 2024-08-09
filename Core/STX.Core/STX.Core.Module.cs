//<auto-generated/>
using System;
using System.Linq;
using STX.Core.Model;
using Microsoft.Extensions.DependencyInjection;
using STX.Core.Automateds.Configuracoes;
using STX.Core.Automateds.Jobs;

namespace STX.Core
{
    public class STXCoreModule : XModule
    {
        public override void Initialize(IServiceCollection pServices)
        {
            pServices.AddTransient<IConfiguracaoJobService, ConfiguracaoJobService>();
            pServices.AddTransient<IJobService, JobService>();
        }
    }
}