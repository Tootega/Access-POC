using System;

using TFX.Access.Model;

namespace STX.Core.Model
{
    public class XStringDataField : XDataField<String?>
    {
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
