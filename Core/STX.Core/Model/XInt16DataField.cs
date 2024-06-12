using System;

using STX.Access.Model;

namespace STX.Core.Model
{
    public class XInt16DataField : XDataField<Int16?>
    {
        public static XInt16DataField operator +(XInt16DataField pField, Int16 pValue)
        {
            var fld = new XInt16DataField();
            fld.Value = pValue;
            if (pField != null)
            {
                fld.Name = pField.Name;
                fld.State = pField.State;
                fld.OldValue = pField.OldValue;
            }
            return fld;
        }

        public static implicit operator XInt16DataField(Int16 pValue)
        {
            var fld = new XInt16DataField();
            fld.Value = pValue;
            return fld;
        }

        public static implicit operator Int16(XInt16DataField pField)
        {
            if (pField.Value.HasValue)
                return pField.Value.Value;
            return (Int16)0;
        }


        public static implicit operator XInt16DataField(Int16? pValue)
        {
            var fld = new XInt16DataField();
            fld.Value = pValue;
            return fld;
        }


        public static implicit operator Int16?(XInt16DataField pField)
        {
            return pField.Value;
        }

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
