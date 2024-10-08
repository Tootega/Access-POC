//<auto-generated/>
using System;
using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace STX.Core.Automateds
{
    public class CORxJob
    {
        [Display(Name = "Job")]
        [Required()]
        public Guid? CORxJobID {get; set;}

        [MaxLength(128)]
        [Required()]
        public String Nome {get; set;}

        public List<CORxJobConfiguracao> CORxJobConfiguracao {get; set;} = new List<CORxJobConfiguracao>();
    }
}
