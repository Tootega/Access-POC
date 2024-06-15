using System;

using STX.Access.Model;

namespace STX.Core.Model
{
    public class XBooleanDataField : XDataField<Boolean>
    {
        public static XBooleanDataField operator +(XBooleanDataField pField, Boolean pValue)
        {
            var fld = new XBooleanDataField();
            fld.Value = pValue;
            if (pField != null)
            {
                fld.State = pField.State;
                fld.OldValue = pField.OldValue;
            }
            return fld;
        }

        public static implicit operator XBooleanDataField(Boolean pValue)
        {
            var fld = new XBooleanDataField();
            fld.Value = pValue;
            return fld;
        }

        public static implicit operator Boolean(XBooleanDataField pField)
        {
            return pField.Value;
        }

        public XBooleanDataField()
        {
        }

        public XBooleanDataField(XFieldState pState, Boolean pValue)
        {
            Value = pValue;
            State = pState;
        }

        public XBooleanDataField(XFieldState pState = XFieldState.Empty, Boolean pValue = false, Object pOldValue = null)
        {
            Value = pValue;
            OldValue = pOldValue;
            State = pState;
        }
    }
}
