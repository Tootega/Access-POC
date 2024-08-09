using System;
using System.Collections.Generic;

using STX.Core.Cache;

namespace STX.Core.Model
{
    public class XDataSet<T>where T : XServiceDataTuple,new()
    {
        public XDataSet()
        {
            Tuples = new List<T>();
		}
		public T AddTuple()
		{
			var tpl = new T();
			tpl.Initialize();
			Tuples.Add(tpl);
			return tpl;
		}

		public List<T> Tuples
        {
            get; set;
        }

        protected virtual T NewTuple()
        {
            return default;
        }

		public virtual Guid ID
		{
			get;
		}

		protected XJobConfig InternalGetConfig(Guid pID)
		{
			return XCacheManager.GetConfig(pID);
		}

	}
}
