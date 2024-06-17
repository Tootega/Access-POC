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
        public class XDefault
        {
            private static Dictionary<Guid, CORxRecursoDireito> _SeedData = new Dictionary<Guid, CORxRecursoDireito>()
            {
                [new Guid("6187F500-B6AD-46E8-94E6-F2751C9358B1")] = new CORxRecursoDireito { CORxRecursoDireitoID = new Guid("6187F500-B6AD-46E8-94E6-F2751C9358B1"), CORxDireiroID = new Guid("EC1EFFEA-1CCF-45FE-BE30-B91CE86673A8"), CORxRecursoID = new Guid("99DF499E-844F-47EE-AEE6-C6462B18A3E0"), SYSxEstadoID = (Int16)1 },
                [new Guid("BFFDEC08-20E6-473E-8E78-767FBC07498C")] = new CORxRecursoDireito { CORxRecursoDireitoID = new Guid("BFFDEC08-20E6-473E-8E78-767FBC07498C"), CORxDireiroID = new Guid("79457E9E-9948-4C3C-8605-D810AF504E4C"), CORxRecursoID = new Guid("99DF499E-844F-47EE-AEE6-C6462B18A3E0"), SYSxEstadoID = (Int16)1 },
                [new Guid("789C7F93-9343-42FD-9970-E99BD4D03DE3")] = new CORxRecursoDireito { CORxRecursoDireitoID = new Guid("789C7F93-9343-42FD-9970-E99BD4D03DE3"), CORxDireiroID = new Guid("04B3A66C-C0F0-4F99-9864-08403BAA71BE"), CORxRecursoID = new Guid("99DF499E-844F-47EE-AEE6-C6462B18A3E0"), SYSxEstadoID = (Int16)1 }
            };

            public static CORxRecursoDireito[] SeedData => _SeedData.Values.ToArray();

        }
        [Display(Name = "Direito")]
        [Required()]
        public Guid CORxDireiroID {get; set;}

        [Display(Name = "Diureitos por Recurso")]
        [Required()]
        public Guid? CORxRecursoDireitoID {get; set;}

        [Display(Name = "Recurso")]
        [Required()]
        public Guid CORxRecursoID {get; set;}

        [Display(Name = "Estado")]
        [Required()]
        public Int16 SYSxEstadoID {get; set;}

        public CORxDireiro CORxDireiro {get; set;}
        public CORxRecurso CORxRecurso {get; set;}
        public CORxEstado CORxEstado {get; set;}
        public List<CORxPerfilDireiro> CORxPerfilDireiro {get; set;} = new List<CORxPerfilDireiro>();
    }
}
