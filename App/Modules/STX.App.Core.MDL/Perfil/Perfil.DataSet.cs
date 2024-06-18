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

namespace STX.App.Core.INF.Perfil
{
    public class PerfilTuple : XServiceDataTuple
    {
        public XGuidDataField CORxPerfilID {get;set;}
        public XStringDataField Nome {get;set;}
        public PerfilDireitoTuple[] PerfilDireito {get;set;}
    }

    public class PerfilFilter : XFilter
    {
        public XStringDataField Nome {get;set;}
    }
    public static class FRMPerfilFilter
    {
        public static readonly XFRMField Nome = new XFRMField(new Guid("CCD8BD5C-0252-45A3-8BEE-E21343D3171B"), "Nome");
    }

    public class PerfilRequest : XRequest
    {
        public Guid CORxPerfilID {get;set;}
    }

    public interface IPerfilService : XIService
    {
        void Flush(PerfilDataSet pDataSet);
        PerfilDataSet GetByPK(PerfilRequest pRequest, Boolean pFull = true);
        PerfilDataSet Select(PerfilFilter pFilter, Boolean pFull = false);
        PerfilDataSet Select(PerfilRequest pRequest, PerfilFilter pFilter, Boolean pFull);
    }

    public abstract class BasePerfilRule : XServiceRuleC<List<PerfilTuple>, PerfilFilter, PerfilRequest>
    {
        public BasePerfilRule(XService pOwner)
            :base(pOwner)
        {
        }
    }

    public class PerfilDataSet : XDataSet<PerfilTuple>
    {
    }
}