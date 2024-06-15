using System;

using STX.Access.Model;

namespace STX.Core.Model
{
    public class XGuidDataField : XDataField<Guid>
    {
        public static XGuidDataField operator +(XGuidDataField pField, Guid pValue)
        {
            var fld = new XGuidDataField();
            fld.Value = pValue;
            if (pField != null)
            {
                fld.State = pField.State;
                fld.OldValue = pField.OldValue;
            }
            return fld;
        }

        public static implicit operator XGuidDataField(Guid pValue)
        {
            var fld = new XGuidDataField();
            fld.Value = pValue;
            return fld;
        }

        public static implicit operator Guid(XGuidDataField pField)
        {
            return pField.Value;
        }


        public XGuidDataField()
        {
        }

        public XGuidDataField(XFieldState pState, Guid pValue)
        {
            Value = pValue;
            State = pState;
        }

        public XGuidDataField(XFieldState pState = XFieldState.Empty, Guid? pValue = null, Object pOldValue = null)
        {
            if (!pValue.HasValue)
                pValue = Guid.Empty;
            Value = pValue.Value;
            OldValue = pOldValue;
            State = pState;
        }
    }
}
