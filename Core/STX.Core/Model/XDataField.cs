using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

using STX.Core.Interfaces;

using STX.Core.Model;

namespace STX.Access.Model
{

    public class XDataField
    {
        public void Set<TValue, T>(TValue pField, T Value)
        {
        }

    }

    public class XDataField<T> : XDataField, XIDataField
    {

        public XDataField()
        {
        }

        public XDataField(XFieldState pState, T pValue, Object pOldValue = null)
        {
            Value = pValue;
            OldValue = pOldValue;
            State = pState;
        }

        public T Value
        {
            get; set;
        }

        [JsonIgnore]
        public Object? OldValue
        {
            get; set;
        }

        public XFieldState State
        {
            get; set;
        }
    }
}

