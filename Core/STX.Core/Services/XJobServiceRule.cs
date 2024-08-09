using System;
using System.Linq;

using Microsoft.Extensions.Logging;

namespace STX.Core.Services
{

	public abstract class XJobServiceRule<T, TPK> : XServiceRuleA<T, TPK>
	{

		public XJobServiceRule(XService pService)
			: base(pService)
		{
		}

	}
}
