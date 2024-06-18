using System;

using STX.Access.Model;

namespace STX.Core.Model
{
    public class XGuidDataField : XDataField<Guid>
    {
        public static implicit operator XGuidDataField(Guid pValue)
        {
            var fld = new XGuidDataField(pValue);
            return fld;
        }

        public static implicit operator Guid(XGuidDataField pField)
        {
            return pField.Value;
        }

        public XGuidDataField(Guid pValue)
            : base(pValue)
        {
        }
        public XGuidDataField(Object pValue)
            : this(XFieldState.Unchanged, pValue)
        {
        }

        public XGuidDataField(XFieldState pState, Guid pValue)
            : base(pState, pValue)
        {
        }

        public XGuidDataField(XFieldState pState, object pValue)
            : base(pState, pValue)
        {
        }

        public XGuidDataField(XFieldState pState, Guid pValue, object pOldValue)
            : base(pState, pValue, pOldValue)
        {
        }
    }
}
