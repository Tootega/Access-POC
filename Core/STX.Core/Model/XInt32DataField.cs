using System;

using STX.Access.Model;

namespace STX.Core.Model
{
    public class XInt32DataField : XDataField<Int32?>
    {
        public XInt32DataField()
        {
        }

        public XInt32DataField(String pName, XFieldState pState, Int32? pValue)
        {
            Name = pName;
            Value = pValue;
            State = pState;
        }

        public XInt32DataField(String pName, XFieldState pState = XFieldState.Empty, Int32? pValue = null, Object pOldValue = null)
        {
            Name = pName;
            Value = pValue;
            OldValue = pOldValue;
            State = pState;
        }
    }
}
