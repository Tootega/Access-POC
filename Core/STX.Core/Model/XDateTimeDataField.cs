using System;

using STX.Access.Model;

namespace STX.Core.Model
{
    public class XDateTimeDataField : XDataField<DateTime>
    {
        public static implicit operator XDateTimeDataField(DateTime pValue)
        {
            var fld = new XDateTimeDataField(pValue);
            return fld;
        }

        public static implicit operator DateTime(XDateTimeDataField pField)
        {
            return pField.Value;
        }

        public XDateTimeDataField()
        {               
        }

        public XDateTimeDataField(DateTime pValue) : base(pValue)
        {
        }

        public XDateTimeDataField(XFieldState pState, DateTime pValue)
            : base(pState, pValue)
        {
        }

        public XDateTimeDataField(XFieldState pState, Object pValue)
            : base(pState, pValue)
        {
        }

        public XDateTimeDataField(XFieldState pState, DateTime pValue, Object pOldValue)
            : base(pState, pValue, pOldValue)
        {
        }
    }
}
