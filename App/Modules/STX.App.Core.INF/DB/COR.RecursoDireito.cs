//<auto-generated/>
using System;
using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace STX.App.Core.INF.DB
{
    public class CORxRecursoDireito
    {
        [Display(Name = "Direito")]
        [Required()]
        public Guid CORxDireiroID {get; set;}

        [Display(Name = "Diureitos por Recurso")]
        [Required()]
        public Guid? CORxRecursoDireitoID {get; set;} = Guid.Empty;

        [Display(Name = "Recurso")]
        [Required()]
        public Guid CORxRecursoID {get; set;}

        [Display(Name = "Estado")]
        [Required()]
        public Int16 SYSxEstadoID {get; set;}

        public CORxDireiro CORxDireiro {get; set;}
        public CORxRecurso CORxRecurso {get; set;}
        public CORxEstado CORxEstado {get; set;}
    }
}
