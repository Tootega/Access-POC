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
        public static Boolean operator !=(XDataField<T> pLeft, XDataField<T> pRight)
        {
            return !Object.Equals(pLeft.Value, pRight.Value);
        }

        public static Boolean operator ==(XDataField<T> pLeft, XDataField<T> pRight)
        {
            return Object.Equals(pLeft.Value, pRight.Value);
        }

        public XDataField()
        {
        }

        public XDataField(XFieldState pState, T pValue, Object pOldValue = null)
        {
            Value = pValue;
            OldValue = pOldValue;
            State = pState;
        }

        private T _Value;
        public T Value
        {
            get
            {
                return _Value;
            }
            set
            {
                if (!Object.Equals(_Value, value))
                {
                    _Value = value;
                    if (State != XFieldState.Modified)
                        State = XFieldState.Modified;
                }
            }
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

        public override Boolean Equals(Object pObject)
        {
            if (GetHashCode() == pObject?.GetHashCode())
                return true;
            var other = pObject as XDataField<T>;
            if (other != null && Object.Equals(other.Value, Value))
                return true;
            return false;
        }

        public override Int32 GetHashCode()
        {
            return base.GetHashCode();
        }
    }
}

