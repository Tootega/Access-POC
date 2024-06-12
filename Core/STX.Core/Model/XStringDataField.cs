using System;

using STX.Access.Model;

namespace STX.Core.Model
{
    public class XStringDataField : XDataField<String>
    {
        public static XStringDataField operator +(XStringDataField pField, String pValue)
        {
            var fld = new XStringDataField();
            fld.Value = pValue;
            if (pField != null)
            {
                fld.State = pField.State;
                fld.OldValue = pField.OldValue;
            }
            return fld;
        }

        public static implicit operator XStringDataField(String pValue)
        {
            var fld = new XStringDataField();
            fld.Value = pValue;
            return fld;
        }

        public static implicit operator String(XStringDataField pField)
        {
            return pField.Value;
        }

        public XStringDataField()
        {
        }

        public XStringDataField(XFieldState pState, String? pValue)
        {
            Value = pValue;
            State = pState;
        }

        public XStringDataField(XFieldState pState = XFieldState.Empty, String? pValue = null, Object pOldValue = null)
        {
            Value = pValue;
            OldValue = pOldValue;
            State = pState;
        }
    }
}
