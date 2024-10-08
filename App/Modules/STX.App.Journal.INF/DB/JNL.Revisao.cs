//<auto-generated/>
using System;
using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using STX.Core.Access.DB;
using STX.App.Core.INF.DB;

namespace STX.App.Journal.INF.DB
{
    public class JNLxRevisao
    {
        [MaxLength(100)]
        [Required()]
        public String App {get; set;}

        [Display(Name = "Tenat")]
        [Required()]
        public Guid CORxTenatID {get; set;}

        [Required()]
        public DateTime Data {get; set;}

        [MaxLength(50)]
        [Required()]
        public String Host {get; set;}

        [Display(Name = "Ação")]
        [Required()]
        public Int16 JNLxAcaoID {get; set;}

        [Display(Name = "Revisão")]
        [Required()]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public Int64 JNLxRevisaoID {get; set;}

        [Display(Name = "Tabela")]
        [Required()]
        public Guid JNLxTabelaID {get; set;}

        [Display(Name = "Usuários")]
        [Required()]
        public Guid TAFxUsuarioID {get; set;}

        [Display(Name = "Transação")]
        [Required()]
        public Guid Transacao {get; set;}

        public JNLxTabela JNLxTabela {get; set;}
        public TAFxUsuario TAFxUsuario {get; set;}
        public CORxTenat CORxTenat {get; set;}
        public JNLxAcao JNLxAcao {get; set;}
    }
}
