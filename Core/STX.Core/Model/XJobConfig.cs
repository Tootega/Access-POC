using System;

namespace STX.Core.Model
{
	public abstract class XJobConfig
	{
		public int Interval
		{
			get; set;
		}
		public Guid ID
		{
			get; set;
		}
	}
}
