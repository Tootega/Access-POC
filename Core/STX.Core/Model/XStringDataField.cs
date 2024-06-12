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
                fld.Name = pField.Name;
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

        public XStringDataField(String pName, XFieldState pState, String? pValue)
        {
            Name = pName;
            Value = pValue;
            State = pState;
        }

        public XStringDataField(String pName, XFieldState pState = XFieldState.Empty, String? pValue = null, Object pOldValue = null)
        {
            Name = pName;
            Value = pValue;
            OldValue = pOldValue;
            State = pState;
        }
    }
}
