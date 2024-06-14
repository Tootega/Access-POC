//<auto-generated/>
using System;
using System.Linq;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace STX.App.Core.INF.DB
{
    public  static class CORModel
    {

        public static class TAFxUsuario
        {
        }

        public static class CORxPerfil
        {
            public const string sAdministrador = @"Administrador";
            public static Guid Administrador = new Guid("67BD4F5D-4FB2-40A0-84C1-BD75AE669DD1");
            public const string sVendedor = @"Vendedor";
            public static Guid Vendedor = new Guid("9A0B3913-4CA5-46D6-8161-3CFD80CA7AD2");
        }

        public static class CORxDireiro
        {
            public const string sInserir = @"Inserir";
            public static Guid Inserir = new Guid("EC1EFFEA-1CCF-45FE-BE30-B91CE86673A8");
            public const string sInativar = @"Inativar";
            public static Guid Inativar = new Guid("DD926A04-2489-4BEF-BABA-87F63000B330");
            public const string sDeletar = @"Deletar";
            public static Guid Deletar = new Guid("79457E9E-9948-4C3C-8605-D810AF504E4C");
            public const string sVisualizar = @"Visualizar";
            public static Guid Visualizar = new Guid("04B3A66C-C0F0-4F99-9864-08403BAA71BE");
            public const string sAlterar = @"Alterar";
            public static Guid Alterar = new Guid("4B7D2E6B-5500-4156-B6F8-3A42C3A9B398");
        }

        public static class CORxPerfilDireiro
        {
            public static Guid _3C1FC583AE51471DB9E6F32E1E4FED46 = new Guid("3C1FC583-AE51-471D-B9E6-F32E1E4FED46");
            public static Guid _10853D4058F14B93874DB49A61F8E486 = new Guid("10853D40-58F1-4B93-874D-B49A61F8E486");
            public static Guid _726FF2AA9CAA46B99C1C4422F23203B6 = new Guid("726FF2AA-9CAA-46B9-9C1C-4422F23203B6");
        }

        public static class CORxEstado
        {
            public const string sInativo = @"Inativo";
            public const Int16 Inativo = (Int16)0;
            public const string sAtivo = @"Ativo";
            public const Int16 Ativo = (Int16)1;
            public const string sf_dfd_fdfd_ = @"f dfd fdfd ";
            public const Int16 f_dfd_fdfd_ = (Int16)2;
        }

        public static class CORxRecurso
        {
            public const string sPerfil_de_Acesso = @"Perfil de Acesso";
            public static Guid Perfil_de_Acesso = new Guid("99DF499E-844F-47EE-AEE6-C6462B18A3E0");
            public const string sUsuario = @"Usuário";
            public static Guid Usuario = new Guid("E678FE01-3FE3-45E6-A3FF-1AAD064D3745");
        }

        public static class CORxRecursoDireito
        {
            public static Guid _6187F500B6AD46E894E6F2751C9358B1 = new Guid("6187F500-B6AD-46E8-94E6-F2751C9358B1");
            public static Guid BFFDEC0820E6473E8E78767FBC07498C = new Guid("BFFDEC08-20E6-473E-8E78-767FBC07498C");
            public static Guid _789C7F93934342FD9970E99BD4D03DE3 = new Guid("789C7F93-9343-42FD-9970-E99BD4D03DE3");
        }

        public static class CORxMenuItem
        {
            public const string sItem_da_POC = @"Item da POC";
            public static Guid Item_da_POC = new Guid("620DF346-CC9D-4333-B57E-8B5454E5617C");
            public const string sNI = @"NI";
            public static Guid NI = new Guid("00000000-0000-0000-0000-000000000000");
            public const string sPOC = @"POC";
            public static Guid POC = new Guid("2DE8C87D-4E4A-4E57-A567-A6F5ACB92E05");
        }
    }
}