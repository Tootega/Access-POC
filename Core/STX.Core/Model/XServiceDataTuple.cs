using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

using STX.Access.Model;
using STX.Core.Interfaces;
using STX.Core.Model;

namespace STX.Core.Model
{

    public class XServiceDataTuple
    {
        
        public XTupleState State
        {
            get; set;
        }

        public Boolean IsReadOnly
        {
            get; set;
        }

        public Boolean IsSelected
        {
            get; set;
        }

        public Boolean IsChecked
        {
            get; set;
        }
    }
}
