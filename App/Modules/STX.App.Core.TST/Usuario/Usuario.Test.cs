using System.Net;
using System.Text;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

using STX.App.Core.INF.Usuario;

namespace STX.App.Core.TST.Usuario
{

    public class UsuarioTest
    {
        [Fact]
        public void LoginParallel()
        {
            var dataset = new UsuarioDataSet();
            var tpl = new UsuarioTuple();
            tpl.Login = "jdkxkhf jkdhkfj";
            dataset.Tuples.Add(tpl);
        }
    }
}
