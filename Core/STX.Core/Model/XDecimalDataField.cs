using System;

using STX.Core.Model;

namespace STX.Access.Model
{
    public class XDecimalDataField : XDataField<Decimal>
    {
        public static implicit operator XDecimalDataField(Decimal pValue)
        {
            var fld = new XDecimalDataField(pValue);
            return fld;
        }

        public static implicit operator Decimal(XDecimalDataField pField)
        {
            return pField.Value;
        }

        public XDecimalDataField()
        {
        }

        public XDecimalDataField(decimal pValue) : base(pValue)
        {
        }

        public XDecimalDataField(XFieldState pState, decimal pValue)
            : base(pState, pValue)
        {
        }

        public XDecimalDataField(XFieldState pState, Object pValue)
            : base(pState, pValue)
        {
        }

        public XDecimalDataField(XFieldState pState, decimal pValue, Object pOldValue)
            : base(pState, pValue, pOldValue)
        {
        }
    }
}
