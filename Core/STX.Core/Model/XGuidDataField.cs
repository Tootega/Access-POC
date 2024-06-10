using System;

using STX.Access.Model;

namespace STX.Core.Model
{
    public class XGuidDataField : XDataField<Guid?>
    {
        public XGuidDataField()
        {
        }

        public XGuidDataField(String pName, XFieldState pState, Guid? pValue)
        {
            Name = pName;
            Value = pValue;
            State = pState;
        }

        public XGuidDataField(String pName, XFieldState pState = XFieldState.Empty, Guid? pValue = null, Object pOldValue = null)
        {
            Name = pName;
            Value = pValue;
            OldValue = pOldValue;
            State = pState;
        }
    }
}
