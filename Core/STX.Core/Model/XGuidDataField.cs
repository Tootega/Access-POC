using System;

using STX.Access.Model;

namespace STX.Core.Model
{
    public class XGuidDataField : XDataField<Guid?>
    {
        public static XGuidDataField operator +(XGuidDataField pField, Guid pValue)
        {
            var fld = new XGuidDataField();
            fld.Value = pValue;
            if (pField != null)
            {
                fld.Name = pField.Name;
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
            if (pField.Value.HasValue)
                return pField.Value.Value;
            return Guid.Empty;
        }


        public static implicit operator XGuidDataField(Guid? pValue)
        {
            var fld = new XGuidDataField();
            fld.Value = pValue;
            return fld;
        }


        public static implicit operator Guid?(XGuidDataField pField)
        {
            return pField.Value;
        }


        public XGuidDataField()
        {
        }

        public XGuidDataField(String pName, XFieldState pState, Guid? pValue)
        {
            Name = pName;
            Value = pValue;
            State = pState;
        }

        public XGuidDataField(String pName, XFieldState pState = XFieldState.Empty, Guid? pValue = null, Object pOldValue = null)
        {
            Name = pName;
            if (pValue.HasValue)
                Value = pValue.Value;
            OldValue = pOldValue;
            State = pState;
        }
    }
}
