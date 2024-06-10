using System;

using STX.Access.Model;

namespace STX.Core.Model
{
    public class XBinaryDataField : XDataField<Byte[]>
    {
        public XBinaryDataField()
        {
        }

        public XBinaryDataField(String pName, XFieldState pState, Byte[] pValue)
        {
            Name = pName;
            Value = pValue;
            State = pState;
        }

        public XBinaryDataField(String pName, XFieldState pState = XFieldState.Empty, Byte[] pValue = null, Object pOldValue = null)
        {
            Name = pName;
            Value = pValue;
            OldValue = pOldValue;
            State = pState;
        }
    }
}
