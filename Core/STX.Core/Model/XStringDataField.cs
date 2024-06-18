using System;

using STX.Access.Model;

namespace STX.Core.Model
{
    public class XStringDataField : XDataField<String>
    {
        public static implicit operator XStringDataField(String pValue)
        {
            var fld = new XStringDataField(pValue);
            return fld;
        }

        public static implicit operator String(XStringDataField pField)
        {
            return pField.Value;
        }

        public XStringDataField(String pValue)
            : base(pValue)
        {
        }

        public XStringDataField(XFieldState pState, String pValue)
            : base(pState, pValue)
        {
        }

        public XStringDataField(XFieldState pState, String pValue, Object pOldValue)
            : base(pState, pValue, pOldValue)
        {
        }
    }
}
