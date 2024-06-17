using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using STX.Core.Model;

namespace STX.Access
{
    public abstract class XTest<Rule, Tuple>
        where Tuple : XServiceDataTuple
        where Rule : XTestRule<Tuple>, new()
    {
        public abstract void Run();

        protected Rule CreateRule()
        {
            return new Rule();
        }
    }
}
