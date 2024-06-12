using System;

using STX.Access.Model;

namespace STX.Core.Model
{
    public class XInt32DataField : XDataField<Int32?>
    {
        public static XInt32DataField operator +(XInt32DataField pField, Int32 pValue)
        {
            var fld = new XInt32DataField();
            fld.Value = pValue;
            if (pField != null)
            {
                fld.Name = pField.Name;
                fld.State = pField.State;
                fld.OldValue = pField.OldValue;
            }
            return fld;
        }

        public static implicit operator XInt32DataField(Int32 pValue)
        {
            var fld = new XInt32DataField();
            fld.Value = pValue;
            return fld;
        }

        public static implicit operator Int32(XInt32DataField pField)
        {
            if (pField.Value.HasValue)
                return pField.Value.Value;
            return (Int32)0;
        }


        public static implicit operator XInt32DataField(Int32? pValue)
        {
            var fld = new XInt32DataField();
            fld.Value = pValue;
            return fld;
        }


        public static implicit operator Int32?(XInt32DataField pField)
        {
            return pField.Value;
        }

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
