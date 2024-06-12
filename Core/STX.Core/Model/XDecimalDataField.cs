using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

using STX.Core;
using STX.Core.Model;

namespace STX.Access.Model
{

    public class XDecimalDataField : XDataField<Decimal?>
    {
        public static XDecimalDataField operator +(XDecimalDataField pField, Decimal pValue)
        {
            var fld = new XDecimalDataField();
            fld.Value = pValue;
            if (pField != null)
            {
                fld.Name = pField.Name;
                fld.State = pField.State;
                fld.OldValue = pField.OldValue;
            }
            return fld;
        }

        public static implicit operator XDecimalDataField(Decimal pValue)
        {
            var fld = new XDecimalDataField();
            fld.Value = pValue;
            return fld;
        }

        public static implicit operator Decimal(XDecimalDataField pField)
        {
            if (pField.Value.HasValue)
                return pField.Value.Value;
            return 0M;
        }


        public static implicit operator XDecimalDataField(Decimal? pValue)
        {
            var fld = new XDecimalDataField();
            fld.Value = pValue;
            return fld;
        }


        public static implicit operator Decimal?(XDecimalDataField pField)
        {
            return pField.Value;
        }

        public XDecimalDataField()
        {
        }

        public XDecimalDataField(String pName, XFieldState pState, Decimal? pValue)
        {
            Name = pName;
            Value = pValue;
            State = pState;
        }

        public XDecimalDataField(String pName, XFieldState pState = XFieldState.Empty, Decimal? pValue = null, Object pOldValue = null)
        {
            Name = pName;
            Value = pValue;
            OldValue = pOldValue;
            State = pState;
        }
    }
}
