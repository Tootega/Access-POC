//<auto-generated/>
using System;
using System.Linq;
using System.Collections.Generic;
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using STX.Core;
using STX.Core.Model;
using STX.Core.Services;
using STX.Core.Reflections;
using STX.Core.Automateds.Jobs;
using STX.Core.Automateds;

namespace STX.Core.Automateds.Jobs
{
    [XGuid("02793BD0-3FE1-4BFE-B373-D581B69B40AB", typeof(IJobService))]
    public class JobService : XService, IJobService
    {
        public class DBContext : XDBContext
        {
            internal static DBContext Create(XDBContext pOwner = null)
            {
                return new DBContext(new DbContextOptions<DBContext>(), pOwner);
            }

            private DBContext(DbContextOptions<DBContext> pOtions, XDBContext pOwner)
                   :base(pOtions, pOwner)
            {
            }

            internal DbSet<CORxJob> CORxJob{get; set;}

            private void ConfigureCORxJob(ModelBuilder pBuilder)
            {
                pBuilder.Entity<CORxJob>(ett =>
                {
                    ett.HasKey(e => e.CORxJobID).HasName("PK_CORxJob");
                    
                    ett.Property(d => d.CORxJobID).HasColumnType(GetDBType("Guid", 0, 0));
                    ett.Property(d => d.Nome).HasColumnType(GetDBType("String", 128, 0));
                    ett.ToTable("CORxJob");
                });
            }

            protected override void OnModelCreating(ModelBuilder pBuilder)
            {
                ConfigureCORxJob(pBuilder);
            }
        }

        public JobService(XService pOwner)
               :base(pOwner)
        {
            _Rule = new JobRule(this);
        }

        public JobService(ILogger<XService> pLogger)
               :base(pLogger)
        {
            _Rule = new JobRule(this);
        }

        private XIServiceRuleC _Rule;

        public override Guid ID => new Guid("02793BD0-3FE1-4BFE-B373-D581B69B40AB");

        protected override XDBContext CreateContext(XDBContext pOwner)
        {
            return DBContext.Create(pOwner);
        }

        public DBContext Context
        {
            get
            {
                return (DBContext)ProtectedContext  ?? GetContext<DBContext>();
            }
        }

        [HttpPost, Route("Flush")]
        public void Flush(JobDataSet pDataSet)
        {
            var ctx = GetContext<DBContext>();
            ctx.BeginTransaction();
            _Rule?.InternalBeforeFlush(pDataSet.Tuples);

            SetJobValues(ctx, pDataSet);
            ctx.SaveChanges();

            _Rule?.InternalAfterFlush(pDataSet.Tuples);

            ctx.Commit();
        }

        private void SetJobValues(DBContext ctx, JobDataSet pDataSet)
        {
            if (pDataSet == null || pDataSet.Tuples == null)
                return;
            foreach (JobTuple stpl in pDataSet.Tuples)
            {
                if (HasChanges(stpl, stpl.CORxJobID, stpl.Nome))
                {
                    var CORxJobtpl = new CORxJob();
                    CORxJobtpl.CORxJobID = stpl.CORxJobID.Value;
                    CORxJobtpl.Nome = stpl.Nome.Value;
                    var tbl = ctx.CORxJob.Add(CORxJobtpl);
                    tbl.State = GetState(stpl, stpl.CORxJobID, stpl.Nome);
                }
            }
        }

        public JobDataSet GetByPK(JobRequest pRequest, Boolean pFull = true)
        {
            var dataset = Select(pRequest, null, pFull);
            return dataset;
        }

        JobDataSet IJobService.Select(JobFilter pFilter, Boolean pFull = false)
        {
            var dataset = Select(null, pFilter, pFull);
            return dataset;
        }

        public JobDataSet Select(JobRequest pRequest, JobFilter pFilter, Boolean pFull)
        {
            var ctx = Context;
            var query = from CORxJob in ctx.CORxJob
                        select new {CORxJob};

            query = _Rule?.InternalGetWhere(query,  pRequest, pFilter, pFull);

            if (pRequest != null)
                query = query.Where(q => q.CORxJob.CORxJobID == pRequest.CORxJobID);

            if (pFilter != null)
            {
                if (pFilter.Nome != null && pFilter.Nome.State != XFieldState.Empty)
                    query = query.Where(q => EF.Functions.Like(q.CORxJob.Nome, "%" + pFilter.Nome.Value + "%"));
            }

            if (pFilter?.SkipRows > 0)
                query = query.Skip(pFilter.SkipRows);

            if (pFilter?.TakeRows > 0)
                query = query.Take(pFilter.TakeRows);

            var dst = query.Select(q => new JobTuple(){CORxJobID = new XGuidDataField(q.CORxJob.CORxJobID),
                           Nome = new XStringDataField(q.CORxJob.Nome)});
            var dataset = new JobDataSet { Tuples = dst.ToList() };
            _Rule.InternalAfterSelect(dataset.Tuples);
            return dataset;
        }
    }
}