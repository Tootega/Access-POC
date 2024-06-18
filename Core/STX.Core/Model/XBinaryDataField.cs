using System;

using STX.Access.Model;

namespace STX.Core.Model
{
    public class XBinaryDataField : XDataField<Byte[]>
    {
        public static implicit operator XBinaryDataField(Byte[] pValue)
        {
            var fld = new XBinaryDataField(pValue);
            return fld;
        }

        public static implicit operator Byte[](XBinaryDataField pField)
        {
            return pField.Value;
        }

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
