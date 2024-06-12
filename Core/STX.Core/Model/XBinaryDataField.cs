using System;

using STX.Access.Model;

namespace STX.Core.Model
{
    public class XBinaryDataField : XDataField<Byte[]>
    {
        public static XBinaryDataField operator +(XBinaryDataField pField, Byte[] pValue)
        {
            var fld = new XBinaryDataField();
            fld.Value = pValue;
            if (pField != null)
            {
                fld.Name = pField.Name;
                fld.State = pField.State;
                fld.OldValue = pField.OldValue;
            }
            return fld;
        }

        public static implicit operator XBinaryDataField(Byte[] pValue)
        {
            var fld = new XBinaryDataField();
            fld.Value = pValue;
            return fld;
        }

        public static implicit operator Byte[](XBinaryDataField pField)
        {
            return pField.Value;
        }

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
