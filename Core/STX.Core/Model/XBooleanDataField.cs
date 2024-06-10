using System;

using STX.Access.Model;

namespace STX.Core.Model
{
    public class XBooleanDataField : XDataField<Boolean?>
    {
        public XBooleanDataField()
        {
        }

        public XBooleanDataField(String pName, XFieldState pState, Boolean? pValue)
        {
            Name = pName;
            Value = pValue;
            State = pState;
        }

        public XBooleanDataField(String pName, XFieldState pState = XFieldState.Empty, Boolean? pValue = null, Object pOldValue = null)
        {
            Name = pName;
            Value = pValue;
            OldValue = pOldValue;
            State = pState;
        }
    }
}
