//<auto-generated/>
using System;
using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace STX.App.Core.INF.DB
{
    public class CORxPessoa
    {
        [Display(Name = "Pessoa")]
        [Required()]
        public Guid? CORxPessoaID {get; set;} = Guid.Empty;

        [MaxLength(256)]
        [Required()]
        public String Nome {get; set;}

        public List<CORxUsuario> CORxUsuario {get; set;} = new List<CORxUsuario>();
    }
}
