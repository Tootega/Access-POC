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


    public class UsuarioTestRule : XTestRule<UsuarioTuple>
    {
        public override void AfterExecute(Int32 pIndex, UsuarioTuple pTuple)
        {
        }

        public override void BeforeExecute(Int32 pIndex, UsuarioTuple pTuple)
        {
        }
    }

}
