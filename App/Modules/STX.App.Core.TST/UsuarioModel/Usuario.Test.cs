using STX.Access;
using STX.App.Core.INF.Usuario;

namespace STX.App.Core.TST.Usuario
{
    public class UsuarioTestModel : XTest<UsuarioTestRule, UsuarioTuple>
    {
        public abstract class XRule : XTestRule<UsuarioTuple>
        {
        }

        [Theory, ClassData(typeof(UsuarioTestModelData))]
        public void Login(Int32 pIndex, UsuarioTuple pTuple)
        {
            var rule = new UsuarioTestRule();
            rule.BeforeExecute(pIndex, pTuple);
            var dataset = new UsuarioDataSet();
            dataset.Tuples.Add(pTuple);
            rule.AfterExecute(pIndex, pTuple);
        }

        //[Fact]
        public override void Run()
        {
            var data = new UsuarioTestModelData();
            foreach (var item in data.OrderBy(o => o[0]))
                Login((int)item[0], (UsuarioTuple)item[1]);
        }
    }
}
