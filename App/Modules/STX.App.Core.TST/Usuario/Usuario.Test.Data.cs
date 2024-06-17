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
    public class UsuarioTestData : IEnumerable<Object[]>
    {
        private readonly List<Object[]> _data = new List<Object[]>
        {
        new object[] {1, new UsuarioTuple {Login="Maria" } },
        new object[] {2, new UsuarioTuple {Login="Joana" } },
        new object[] {3, new UsuarioTuple {Login="Tereza" } },
        new object[] {4, new UsuarioTuple {Login="Amelia" } }
    };

        public IEnumerator<Object[]> GetEnumerator()
        {
            return _data.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }
    }
}
