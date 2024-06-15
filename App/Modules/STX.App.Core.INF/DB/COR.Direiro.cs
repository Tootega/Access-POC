//<auto-generated/>
using System;
using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace STX.App.Core.INF.DB
{
    public class CORxDireiro
    {
        public class XDefault
        {
            private static Dictionary<Guid, CORxDireiro> _SeedData = new Dictionary<Guid, CORxDireiro>()
            {
                [new Guid("EC1EFFEA-1CCF-45FE-BE30-B91CE86673A8")] = new CORxDireiro { CORxDireiroID = new Guid("EC1EFFEA-1CCF-45FE-BE30-B91CE86673A8"), Direito = @"Inserir" },
                [new Guid("DD926A04-2489-4BEF-BABA-87F63000B330")] = new CORxDireiro { CORxDireiroID = new Guid("DD926A04-2489-4BEF-BABA-87F63000B330"), Direito = @"Inativar" },
                [new Guid("79457E9E-9948-4C3C-8605-D810AF504E4C")] = new CORxDireiro { CORxDireiroID = new Guid("79457E9E-9948-4C3C-8605-D810AF504E4C"), Direito = @"Deletar" },
                [new Guid("04B3A66C-C0F0-4F99-9864-08403BAA71BE")] = new CORxDireiro { CORxDireiroID = new Guid("04B3A66C-C0F0-4F99-9864-08403BAA71BE"), Direito = @"Visualizar" },
                [new Guid("4B7D2E6B-5500-4156-B6F8-3A42C3A9B398")] = new CORxDireiro { CORxDireiroID = new Guid("4B7D2E6B-5500-4156-B6F8-3A42C3A9B398"), Direito = @"Alterar" }
            };

            public static CORxDireiro[] SeedData => _SeedData.Values.ToArray();

        }
        [Display(Name = "Direito")]
        [Required()]
        public Guid CORxDireiroID {get; set;}

        [MaxLength(45)]
        [Required()]
        public String Direito {get; set;}

        public List<CORxRecursoDireito> CORxRecursoDireito {get; set;} = new List<CORxRecursoDireito>();
    }
}
