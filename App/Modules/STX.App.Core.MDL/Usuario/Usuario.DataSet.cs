//<auto-generated/>
using System;
using System.Linq;
using System.Collections.Generic;
using System.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using STX.Core.Reflections;
using STX.Core.Model;
using STX.Core.Interfaces;
using STX.Core;
using STX.Core.Services;

namespace STX.App.Core.INF.Usuario
{
    public class UsuarioTuple : XServiceDataTuple
    {
        public XStringDataField Login {get;set;}
        public XInt16DataField CORxEstadoID {get;set;}
        public XGuidDataField CORxUsuarioID {get;set;}
        public XGuidDataField CORxPessoaID {get;set;}
        public XStringDataField Nome {get;set;}
        public XGuidDataField CORxPerfilID {get;set;}
        public XStringDataField PerfilNome {get;set;}
        public override void Initialize()
        {
            Login = new XStringDataField();
            CORxEstadoID = new XInt16DataField();
            CORxUsuarioID = new XGuidDataField();
            CORxPessoaID = new XGuidDataField();
            Nome = new XStringDataField();
            CORxPerfilID = new XGuidDataField();
            PerfilNome = new XStringDataField();
        }
    }

    public class UsuarioFilter : XFilter
    {
        public XStringDataField Nome {get;set;}
        public XStringDataField Login {get;set;}
        public XStringDataField PerfilNome {get;set;}
    }
    public static class FRMUsuarioFilter
    {
        public static readonly XFRMField Nome = new XFRMField(new Guid("A2173584-A43B-4995-A282-F37C4F245A6F"), "Nome");
    }

    public class UsuarioRequest : XRequest
    {
        public Guid CORxUsuarioID {get;set;}
    }

    public interface IUsuarioService : XIService
    {
        void Flush(UsuarioDataSet pDataSet);
        UsuarioDataSet GetByPK(UsuarioRequest pRequest, Boolean pFull = true);
        UsuarioDataSet Select(UsuarioFilter pFilter, Boolean pFull = false);
        UsuarioDataSet Select(UsuarioRequest pRequest, UsuarioFilter pFilter, Boolean pFull = false);
        UsuarioDataSet Select(Boolean pFull = false)
        {
            return Select(null, pFull);
        }
    }

    public abstract class BaseUsuarioRule : XServiceRuleC<List<UsuarioTuple>, UsuarioFilter, UsuarioRequest>
    {
        public BaseUsuarioRule(XService pOwner)
            :base(pOwner)
        {
        }
    }

    public class UsuarioDataSet : XDataSet<UsuarioTuple>
    {
    }
}