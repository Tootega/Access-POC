using System;

using STX.Access.Model;

namespace STX.Core.Model
{
    public class XDateTimeDataField : XDataField<DateTime>
    {
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
