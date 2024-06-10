using System;

using TFX.Access.Model;

namespace STX.Core.Model
{
    public class XDateTimeDataField : XDataField<DateTime?>
    {
        public XDateTimeDataField()
        {
        }

        public XDateTimeDataField(String pName, XFieldState pState, DateTime? pValue)
        {
            Name = pName;
            Value = pValue;
            State = pState;
        }

        public XDateTimeDataField(String pName, XFieldState pState = XFieldState.Empty, DateTime? pValue = null, Object pOldValue = null)
        {
            Name = pName;
            Value = pValue;
            OldValue = pOldValue;
            State = pState;
        }
    }
}
