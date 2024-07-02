using System;

using STX.Access.Model;

namespace STX.Core.Model
{
    public class XInt64DataField : XDataField<Int64>
    {
        public static implicit operator XInt64DataField(Int64 pValue)
        {
            var fld = new XInt64DataField(pValue);
            return fld;
        }

        public static implicit operator Int64(XInt64DataField pField)
        {
            return pField.Value;
        }

        public XInt64DataField()
        {
        }

        public XInt64DataField(long pValue) : base(pValue)
        {
        }

        public XInt64DataField(XFieldState pState, long pValue)
            : base(pState, pValue)
        {
        }

        public XInt64DataField(XFieldState pState, Object pValue)
            : base(pState, pValue)
        {
        }

        public XInt64DataField(XFieldState pState, long pValue, Object pOldValue)
            : base(pState, pValue, pOldValue)
        {
        }
    }
}
