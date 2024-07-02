using System;

using STX.Access.Model;

namespace STX.Core.Model
{
    public class XGuidDataField : XDataField<Guid>
    {

        public XGuidDataField()
        {
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
