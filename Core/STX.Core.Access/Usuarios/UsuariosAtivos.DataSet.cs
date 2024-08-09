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

namespace STX.Core.Access.Usuarios
{
    public class UsuariosAtivosTuple : XServiceDataTuple
    {
        public XGuidDataField TAFxUsuarioID {get;set;}
        public XStringDataField Login {get;set;}
        public XInt16DataField CORxEstadoID {get;set;}
        public override void Initialize()
        {
            TAFxUsuarioID = new XGuidDataField();
            Login = new XStringDataField();
            CORxEstadoID = new XInt16DataField();
        }
    }

    public class UsuariosAtivosFilter : XFilter
    {
        public XInt16DataField CORxEstadoID {get;set;}
        public XStringDataField Login {get;set;}
    }
    public static class FRMUsuariosAtivosFilter
    {
        public static readonly XFRMField CORxEstadoID = new XFRMField(new Guid("A744F75F-F6BD-4FC1-8FA8-0E67BF4EBA0F"), "CORxEstadoID");
        public static readonly XFRMField Login = new XFRMField(new Guid("2B842CCA-DB72-459B-A155-A741B8ABED45"), "Login");
    }

    public class UsuariosAtivosRequest : XRequest
    {
        public Guid TAFxUsuarioID {get;set;}
    }

    public interface IUsuariosAtivosService : XIService
    {
        void Flush(UsuariosAtivosDataSet pDataSet);
        UsuariosAtivosDataSet GetByPK(UsuariosAtivosRequest pRequest, Boolean pFull = true);
        UsuariosAtivosDataSet Select(UsuariosAtivosFilter pFilter, Boolean pFull = false);
        UsuariosAtivosDataSet Select(UsuariosAtivosRequest pRequest, UsuariosAtivosFilter pFilter, Boolean pFull = false);
        UsuariosAtivosDataSet Select(Boolean pFull = false)
        {
            return Select(null, pFull);
        }
    }

    public abstract class BaseUsuariosAtivosRule : XServiceRuleC<List<UsuariosAtivosTuple>, UsuariosAtivosFilter, UsuariosAtivosRequest>
    {
        public BaseUsuariosAtivosRule(XService pOwner)
            :base(pOwner)
        {
        }
    }

    public class UsuariosAtivosDataSet : XDataSet<UsuariosAtivosTuple>
    {
    }
}