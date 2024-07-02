using System;

using STX.Core.Model;

namespace STX.Access
{
    public abstract class XTestRule<T> where T : XServiceDataTuple
    {
        public abstract void AfterExecute(Int32 pIndex, T pTuple, T pData);

        public abstract void BeforeExecute(Int32 pIndex, T pTuple);
    }
}
