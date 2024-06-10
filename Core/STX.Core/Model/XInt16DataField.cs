using System;

using STX.Access.Model;

namespace STX.Core.Model
{
    public class XInt16DataField : XDataField<Int16?>
    {
        public XInt16DataField()
        {
        }

        public XInt16DataField(String pName, XFieldState pState, Int16? pValue)
        {
            Name = pName;
            Value = pValue;
            State = pState;
        }

        public XInt16DataField(String pName, XFieldState pState = XFieldState.Empty, Int16? pValue = null, Object pOldValue = null)
        {
            Name = pName;
            Value = pValue;
            OldValue = pOldValue;
            State = pState;
        }
    }
}
