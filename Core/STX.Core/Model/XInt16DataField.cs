using System;

using STX.Access.Model;

namespace STX.Core.Model
{
    public class XInt16DataField : XDataField<Int16>
    {
        public static implicit operator XInt16DataField(Int16 pValue)
        {
            var fld = new XInt16DataField(pValue);
            return fld;
        }

        public static implicit operator Int16(XInt16DataField pField)
        {
            return pField.Value;
        }

        public XInt16DataField()
        {               
        }

        public XInt16DataField(short pValue) : base(pValue)
        {
        }

        public XInt16DataField(XFieldState pState, short pValue)
            : base(pState, pValue)
        {
        }

        public XInt16DataField(XFieldState pState, Object pValue)
            : base(pState, pValue)
        {
        }

        public XInt16DataField(XFieldState pState, short pValue, Object pOldValue)
            : base(pState, pValue, pOldValue)
        {
        }
    }
}
