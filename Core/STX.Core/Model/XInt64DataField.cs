using System;

using TFX.Access.Model;

namespace STX.Core.Model
{
    public class XInt64DataField : XDataField<Int64?>
    {
        public XInt64DataField()
        {
        }

        public XInt64DataField(String pName, XFieldState pState, Int64? pValue)
        {
            Name = pName;
            Value = pValue;
            State = pState;
        }

        public XInt64DataField(String pName, XFieldState pState = XFieldState.Empty, Int64? pValue = null, Object pOldValue = null)
        {
            Name = pName;
            Value = pValue;
            OldValue = pOldValue;
            State = pState;
        }
    }
}
