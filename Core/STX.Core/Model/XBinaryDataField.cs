using System;

using STX.Core.Model;

namespace STX.Core.Model
{
    public class XBinaryDataField : XDataField<Byte[]>
    {
        public XBinaryDataField()
        {
        }

        public XBinaryDataField(byte[] pValue)
            : base(pValue)
        {
        }

        public XBinaryDataField(XFieldState pState, byte[] pValue)
            : base(pState, pValue)
        {
        }

        public XBinaryDataField(XFieldState pState, byte[] pValue, Object pOldValue)
            : base(pState, pValue, pOldValue)
        {
        }
    }
}
