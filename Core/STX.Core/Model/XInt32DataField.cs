using System;

using STX.Access.Model;

namespace STX.Core.Model
{
    public class XInt32DataField : XDataField<Int32>
    {
        public static implicit operator XInt32DataField(Int32 pValue)
        {
            var fld = new XInt32DataField(pValue);
            return fld;
        }

        public static implicit operator Int32(XInt32DataField pField)
        {
            return pField.Value;
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
