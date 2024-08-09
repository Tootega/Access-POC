using System;
using System.Linq;

using Microsoft.Extensions.Logging;

namespace STX.Core.Services
{
	public abstract class XJobRabbitMQServiceRule<T, TPK>  :XJobServiceRule<T, TPK> 
	{

		public XJobRabbitMQServiceRule(XService pService)
			: base(pService)
		{
		}

	}
}
