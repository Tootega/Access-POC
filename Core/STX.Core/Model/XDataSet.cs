using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace STX.Access.Model
{
    public class XDataSet<T>
    {
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
