using System.Collections;
using System.Net;
using System.Reflection;
using System.Text;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

using STX.Access;
using STX.App.Core.INF.Usuario;

using Xunit.Sdk;

namespace STX.App.Core.TST.Usuario
{
    public class UsuarioTest  : XTest<UsuarioTestRule, UsuarioTuple>
    {
        [Theory, ClassData(typeof(UsuarioTestData))]
        public  void LoginParallel(Int32 pIndex, UsuarioTuple pTuple)
        {
            var rule = new UsuarioTestRule();
            rule.BeforeExecute(pIndex, pTuple);
            var dataset = new UsuarioDataSet();
            dataset.Tuples.Add(pTuple);
            rule.AfterExecute(pIndex, pTuple);
        }
    }
}
