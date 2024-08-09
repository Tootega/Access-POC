using System;
using System.Threading;

using Microsoft.Extensions.Logging;

using STX.Core.Cache;
using STX.Core.Model;

namespace STX.Core.Services
{
	public abstract class XJobService : XService
	{
		public XJobService(XService pOwner)
			: base(pOwner)
		{
		}

		public XJobService(ILogger<XService> pLogger)
			: base(pLogger)
		{
		}

		private Timer _Timer;
		protected XIJobServiceRule Rule;
		private XJobConfig _Config;
		private bool _Running = false;

		public int NetStart
		{
			get
			{
				if (_Config == null)
					return 0;
				return _Config.Interval;
			}
		}

		public void Initialize(XJobConfig pConfig = null)
		{
			_Config = pConfig ?? XCacheManager.GetConfig(ID);
			if (pConfig == null || pConfig.Interval <= 0)
			{
				_Timer?.Change(Timeout.Infinite, Timeout.Infinite);
				return;
			}
			if (_Timer == null)
				_Timer = new Timer(OnTimer);
			PrepareNext();
		}

		private void PrepareNext()
		{
			_Running = false;
			_Timer.Change(NetStart, Timeout.Infinite);
		}

		private void OnTimer(object pState)
		{
			try
			{
				if (_Running)
					return;
				_Running = true;
				Rule?.InternalExecute();
			}
			catch (Exception pEx)
			{
				Logger?.LogError(pEx, $"Falha no Job {GetType().FullName}");
			}
			finally
			{
				PrepareNext();
			}
		}
	}
}
