using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

using STX.Core.Model;

namespace TFX.Access.Model
{

    public class XDecimalDataField : XDataField<Decimal?>
    {
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
