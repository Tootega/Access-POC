using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using STX.Core.Model;

namespace STX.Access
{
    public class XTest<Rule, Tuple>
        where Tuple : XServiceDataTuple
        where Rule : XTestRule<Tuple>
    {
    }
}
