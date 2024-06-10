using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

using STX.Core.Reflections;

using STX.Core.Model;

namespace TFX.Access.Model
{

    public class XDataField<T> : XIDataField
    {
        public XDataField()
        {
        }

        public XDataField(String pName, XFieldState pState, T pValue, Object pOldValue = null)
        {
            Name = pName;
            Value = pValue;
            OldValue = pOldValue;
            State = pState;
        }

        public T Value
        {
            get; set;
        }

        public String Name
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

