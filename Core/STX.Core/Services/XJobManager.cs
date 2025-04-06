using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;

using Microsoft.Extensions.DependencyInjection;

using Newtonsoft.Json;

using TFX.Core.Automateds.Configuracoes;
using TFX.Core.Automateds.Jobs;
using TFX.Core.Cache;
using TFX.Core.Interfaces;
using TFX.Core.Model;

namespace TFX.Core.Services
{
	public static class XJobManager
	{
		public static List<XJobService> _Jobs = new List<XJobService>();
		private static IServiceScope _Scope;

		public static void Initialize(IServiceScope pScope)
		{
			_Scope = pScope;
			var scfcfg = XService.GetService<IConfiguracaoJobService>();
			var cfgdst = scfcfg.Select(true);
			var svcjob = XService.GetService<IJobService>();
			foreach (var svctp in XCacheManager.GetTypes<XIJobService>())
			{
				var svc = (XJobService)_Scope.ServiceProvider.GetService(svctp.TypeEx);
				var jobdst = svcjob.GetByPK(new JobRequest() { CORxJobID = svc.ID });
				if (jobdst.Tuples.Count == 0)
				{
					var tpl = jobdst.AddTuple();
					tpl.CORxJobID.Value = svc.ID;
					tpl.Nome.Value = svc.Name;
					svcjob.Flush(jobdst);
				}
				svc.Initialize();
				_Jobs.Add(svc);
			}
		}

	}
}
