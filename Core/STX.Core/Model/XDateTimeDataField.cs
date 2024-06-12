using System;

using STX.Access.Model;

namespace STX.Core.Model
{
    public class XDateTimeDataField : XDataField<DateTime?>
    {
        public static XDateTimeDataField operator +(XDateTimeDataField pField, DateTime pValue)
        {
            var fld = new XDateTimeDataField();
            fld.Value = pValue;
            if (pField != null)
            {
                fld.State = pField.State;
                fld.OldValue = pField.OldValue;
            }
            return fld;
        }

        public static implicit operator XDateTimeDataField(DateTime pValue)
        {
            var fld = new XDateTimeDataField();
            fld.Value = pValue;
            return fld;
        }

        public static implicit operator DateTime(XDateTimeDataField pField)
        {
            if (pField.Value.HasValue)
                return pField.Value.Value;
            return XDefault.NullDateTime;
        }


        public static implicit operator XDateTimeDataField(DateTime? pValue)
        {
            var fld = new XDateTimeDataField();
            fld.Value = pValue;
            return fld;
        }


        public static implicit operator DateTime?(XDateTimeDataField pField)
        {
            return pField.Value;
        }

        public XDateTimeDataField()
        {
        }

        public XDateTimeDataField(XFieldState pState, DateTime? pValue)
        {
            Value = pValue;
            State = pState;
        }

        public XDateTimeDataField(XFieldState pState = XFieldState.Empty, DateTime? pValue = null, Object pOldValue = null)
        {
            Value = pValue;
            OldValue = pOldValue;
            State = pState;
        }
    }
}
