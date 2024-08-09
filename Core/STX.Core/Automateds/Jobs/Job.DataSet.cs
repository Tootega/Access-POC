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

namespace STX.Core.Automateds.Jobs
{
    public class JobTuple : XServiceDataTuple
    {
        public XGuidDataField CORxJobID {get;set;}
        public XStringDataField Nome {get;set;}
        public override void Initialize()
        {
            CORxJobID = new XGuidDataField();
            Nome = new XStringDataField();
        }
    }

    public class JobFilter : XFilter
    {
        public XStringDataField Nome {get;set;}
    }
    public static class FRMJobFilter
    {
        public static readonly XFRMField Nome = new XFRMField(new Guid("0FD9AB4D-967C-49DD-9E6C-E6F89AF73E1A"), "Nome");
    }

    public class JobRequest : XRequest
    {
        public Guid CORxJobID {get;set;}
    }

    public interface IJobService : XIService
    {
        void Flush(JobDataSet pDataSet);
        JobDataSet GetByPK(JobRequest pRequest, Boolean pFull = true);
        JobDataSet Select(JobFilter pFilter, Boolean pFull = false);
        JobDataSet Select(JobRequest pRequest, JobFilter pFilter, Boolean pFull = false);
        JobDataSet Select(Boolean pFull = false)
        {
            return Select(null, pFull);
        }
    }

    public abstract class BaseJobRule : XServiceRuleC<List<JobTuple>, JobFilter, JobRequest>
    {
        public BaseJobRule(XService pOwner)
            :base(pOwner)
        {
        }
    }

    public class JobDataSet : XDataSet<JobTuple>
    {
    }
}