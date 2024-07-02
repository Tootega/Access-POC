using System;

using STX.Access.Model;

namespace STX.Core.Model
{
    public class XInt32DataField : XDataField<Int32>
    {
        public XInt32DataField()
        {
        }

        public XInt32DataField(int pValue) : base(pValue)
        {
        }

        public XInt32DataField(XFieldState pState, int pValue)
            : base(pState, pValue)
        {
        }

        public XInt32DataField(XFieldState pState, Object pValue)
            : base(pState, pValue)
        {
        }

        public XInt32DataField(XFieldState pState, int pValue, Object pOldValue)
            : base(pState, pValue, pOldValue)
        {
        }
    }
}
