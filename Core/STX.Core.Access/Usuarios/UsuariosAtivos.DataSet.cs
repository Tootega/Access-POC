//<auto-generated/>
using System;
using System.Linq;
using System.Collections.Generic;
using System.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using STX.Core.Model;
using STX.Core.Interfaces;
using STX.Access.Model;
using STX.Core.Services;

namespace STX.Core.Access.Usuarios
{
    public class UsuariosAtivosTuple : XServiceDataTuple
    {
        public XGuidDataField TAFxUsuarioID {get;set;}
        public XStringDataField Login {get;set;}
        public XInt16DataField Ativo {get;set;}
    }

    public class UsuariosAtivosFilter : XFilter
    {
        public XInt16DataField Ativo {get;set;}
        public XStringDataField Login {get;set;}
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
        UsuariosAtivosDataSet Select(UsuariosAtivosRequest pRequest, UsuariosAtivosFilter pFilter, Boolean pFull);
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