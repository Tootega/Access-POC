//<auto-generated/>
using System;
using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using STX.Core.Access.DB;

namespace STX.App.Core.INF.DB
{
    public class CORxUsuario
    {
        public class XDefault
        {
            private static Dictionary<Guid, CORxUsuario> _SeedData = new Dictionary<Guid, CORxUsuario>()
            {
                [new Guid("00000000-0000-0000-0000-000000000000")] = new CORxUsuario { CORxUsuarioID = new Guid("00000000-0000-0000-0000-000000000000"), CORxPessoaID = new Guid("00000000-0000-0000-0000-000000000000"), CORxPerfilID = new Guid("00000000-0000-0000-0000-000000000000") },
                [new Guid("EBA53C9E-C110-4CA3-96FD-420DC75207B1")] = new CORxUsuario { CORxUsuarioID = new Guid("EBA53C9E-C110-4CA3-96FD-420DC75207B1"), CORxPessoaID = new Guid("8E330979-C053-45E6-A1ED-5FA20D03E18F"), CORxPerfilID = new Guid("00000000-0000-0000-0000-000000000000") }
            };

            public static CORxUsuario[] SeedData => _SeedData.Values.ToArray();

        }
        [Display(Name = "Perfil")]
        [Required()]
        public Guid CORxPerfilID {get; set;}

        [Display(Name = "Pessoa")]
        [Required()]
        public Guid CORxPessoaID {get; set;}

        [Display(Name = "Usuário")]
        [Required()]
        public Guid? CORxUsuarioID {get; set;}

        public TAFxUsuario TAFxUsuario {get; set;}
        public CORxPessoa CORxPessoa {get; set;}
        public CORxPerfil CORxPerfil {get; set;}
        public List<CORxUsuarioPerfil> CORxUsuarioPerfil {get; set;} = new List<CORxUsuarioPerfil>();
    }
}
