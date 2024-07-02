using System.Collections.Generic;

namespace STX.Access.Model
{
    public class XDataSet<T>
    {
        public XDataSet()
        {
            Tuples = new List<T>();
        }

        public List<T> Tuples
        {
            get; set;
        }

        protected virtual T NewTuple()
        {
            return default;
        }

    }
}
