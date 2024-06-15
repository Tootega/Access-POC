using System;

using STX.Access.Model;

namespace STX.Core.Model
{
    public class XInt64DataField : XDataField<Int64>
    {
        public static XInt64DataField operator +(XInt64DataField pField, Int64 pValue)
        {
            var fld = new XInt64DataField();
            fld.Value = pValue;
            if (pField != null)
            {
                fld.State = pField.State;
                fld.OldValue = pField.OldValue;
            }
            return fld;
        }

        public static implicit operator XInt64DataField(Int64 pValue)
        {
            var fld = new XInt64DataField();
            fld.Value = pValue;
            return fld;
        }

        public static implicit operator Int64(XInt64DataField pField)
        {
            return pField.Value;
        }

        public static implicit operator Int64?(XInt64DataField pField)
        {
            return pField.Value;
        }

        public XInt64DataField()
        {
        }

        public XInt64DataField(XFieldState pState, Int64 pValue)
        {
            Value = pValue;
            State = pState;
        }

        public XInt64DataField(XFieldState pState = XFieldState.Empty, Int64 pValue = 0, Object pOldValue = null)
        {
            Value = pValue;
            OldValue = pOldValue;
            State = pState;
        }
    }
}
