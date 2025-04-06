using System;
using System.Linq;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Logging;

using TFX.Core.Interfaces;
using TFX.Core.Model;

namespace TFX.Core.Services
{
	public abstract class XJobRebbitMQService : XJobService
	{
		public XJobRebbitMQService(XService pOwner)
			: base(pOwner)
		{
		}

		public XJobRebbitMQService(ILogger<XService> pLogger)
			: base(pLogger)
		{
		}
	}
}
