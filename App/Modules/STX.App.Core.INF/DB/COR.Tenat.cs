//<auto-generated/>
using System;
using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace STX.App.Core.INF.DB
{
    public class CORxTenat
    {
        [Display(Name = "Tenat")]
        [Required()]
        public Guid? CORxTenatID {get; set;} = Guid.Empty;

        public CORxPessoa CORxPessoa {get; set;}
    }
}
