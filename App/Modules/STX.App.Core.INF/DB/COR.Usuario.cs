//<auto-generated/>
using System;
using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using STX.Core.Access.DB;

namespace STX.App.Core.INF.DB
{
    public  partial class CORxUsuario
    {
        [Display(Name = "Pessoa")]
        [Required()]
        public Guid CORxPessoaID {get; set;}

        [Display(Name = "Usuário")]
        [Required()]
        public Guid? CORxUsuarioID {get; set;} = Guid.Empty;

        public TAFxUsuario TAFxUsuario {get; set;}
        public CORxPessoa CORxPessoa {get; set;}
        public List<CORxUsuarioPerfil> CORxUsuarioPerfil {get; set;} = new List<CORxUsuarioPerfil>();
        public List<CORxPessoaFisica> CORxPessoaFisica {get; set;} = new List<CORxPessoaFisica>();
    }
}
