//<auto-generated/>
using System;
using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using STX.App.Core.INF.DB;

namespace STX.App.Journal.INF.DB
{
    public class JNLxCampo
    {
        [MaxLength(128)]
        [Required()]
        public String Campo {get; set;}

        [Required()]
        public Int32 Escala {get; set;}

        [Display(Name = "Campo")]
        [Required()]
        public Guid? JNLxCampoID {get; set;}

        [Display(Name = "Tabela")]
        [Required()]
        public Guid JNLxTabelaID {get; set;}

        [Display(Name = "É Chave")]
        [Required()]
        public Boolean PK {get; set;}

        [Display(Name = "Estado")]
        [Required()]
        public Int16 SYSxEstadoID {get; set;}

        [Required()]
        public Int32 Tamanho {get; set;}

        [MaxLength(128)]
        [Required()]
        public String Tipo {get; set;}

        public JNLxTabela JNLxTabela {get; set;}
        public CORxEstado CORxEstado {get; set;}
    }
}
