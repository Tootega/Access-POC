using STX.Core.Model;

namespace STX.Access
{
    public abstract class XTest<Rule, Tuple>
        where Tuple : XServiceDataTuple
        where Rule : XTestRule<Tuple>, new()
    {
        protected Rule CreateRule()
        {
            return new Rule();
        }
    }
}
