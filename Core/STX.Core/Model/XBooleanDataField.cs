using System;

using STX.Access.Model;

namespace STX.Core.Model
{
    public class XBooleanDataField : XDataField<Boolean>
    {
        public static implicit operator XBooleanDataField(Boolean pValue)
        {
            var fld = new XBooleanDataField(pValue);
            return fld;
        }

        public static implicit operator Boolean(XBooleanDataField pField)
        {
            return pField.Value;
        }

        public XBooleanDataField()
        {
        }

        public XBooleanDataField(bool pValue) : base(pValue)
        {
        }

        public XBooleanDataField(XFieldState pState, bool pValue)
            : base(pState, pValue)
        {
        }

        public XBooleanDataField(XFieldState pState, object pValue)
            : base(pState, pValue)
        {
        }

        public XBooleanDataField(XFieldState pState, bool pValue, object pOldValue)
            : base(pState, pValue, pOldValue)
        {
        }
    }
}
