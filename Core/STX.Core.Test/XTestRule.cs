using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using STX.Core.Model;

namespace STX.Access
{
    public abstract class XTestRule<T> where T : XServiceDataTuple
    {
        public abstract void AfterExecute(Int32 pIndex, T pTuple);

        public abstract void BeforeExecute(Int32 pIndex, T pTuple);
    }
}
