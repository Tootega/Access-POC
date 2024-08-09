using System;

using STX.Core.Model;

namespace STX.Core.Model
{
    public class XInt16DataField : XDataField<Int16>
    {
        public XInt16DataField()
        {
        }

        public XInt16DataField(short pValue) : base(pValue)
        {
        }

        public XInt16DataField(XFieldState pState, short pValue)
            : base(pState, pValue)
        {
        }

        public XInt16DataField(XFieldState pState, Object pValue)
            : base(pState, pValue)
        {
        }

        public XInt16DataField(XFieldState pState, short pValue, Object pOldValue)
            : base(pState, pValue, pOldValue)
        {
        }
    }
}
