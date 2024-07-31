//<auto-generated/>
using System;
using System.Linq;
using System.Collections.Generic;
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using STX.Core;
using STX.Core.Access.DB;
using STX.Core.Model;
using STX.Core.Services;
using STX.Core.Access.Usuarios;

namespace STX.Core.Access.Usuarios
{
    public class UsuariosAtivosService : XService, IUsuariosAtivosService
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

            internal DbSet<TAFxUsuario> TAFxUsuario{get; set;}

            private void ConfigureTAFxUsuario(ModelBuilder pBuilder)
            {
                pBuilder.Entity<TAFxUsuario>(ett =>
                {
                    ett.HasKey(e => e.TAFxUsuarioID).HasName("PK_TAFxUsuario");
                    
                    ett.Property(d => d.TAFxUsuarioID).HasColumnType(GetDBType("Guid", 0, 0));
                    ett.Property(d => d.Login).HasColumnType(GetDBType("String", 0, 0));
                    ett.Property(d => d.CORxEstadoID).HasColumnType(GetDBType("Int16", 0, 0));
                    ett.ToTable("TAFxUsuario");
                });
            }

            protected override void OnModelCreating(ModelBuilder pBuilder)
            {
                ConfigureTAFxUsuario(pBuilder);
            }
        }

        public UsuariosAtivosService(XService pOwner)
               :base(pOwner)
        {
            _Rule = new UsuariosAtivosRule(this);
        }

        public UsuariosAtivosService(ILogger<XService> pLogger)
               :base(pLogger)
        {
            _Rule = new UsuariosAtivosRule(this);
        }

        private XIServiceRuleC _Rule;

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
        public void Flush(UsuariosAtivosDataSet pDataSet)
        {
            using (var ctx = GetContext<DBContext>())
            {
                ctx.BeginTransaction();
                _Rule?.InternalBeforeFlush(pDataSet.Tuples);

                SetUsuariosAtivosValues(ctx, pDataSet);
                ctx.SaveChanges();

                _Rule?.InternalAfterFlush(pDataSet.Tuples);

                ctx.Commit();
            }
        }

        private void SetUsuariosAtivosValues(DBContext ctx, UsuariosAtivosDataSet pDataSet)
        {
            if (pDataSet == null || pDataSet.Tuples == null)
                return;
            foreach (UsuariosAtivosTuple stpl in pDataSet.Tuples)
            {
                if (HasChanges(stpl, stpl.TAFxUsuarioID, stpl.Login, stpl.CORxEstadoID))
                {
                    var TAFxUsuariotpl = new TAFxUsuario();
                    TAFxUsuariotpl.TAFxUsuarioID = (Guid)stpl.TAFxUsuarioID.Value;
                    TAFxUsuariotpl.Login = (String)stpl.Login.Value;
                    TAFxUsuariotpl.CORxEstadoID = (Int16)stpl.CORxEstadoID.Value;
                    ctx.Add(TAFxUsuariotpl).State = GetState(stpl, stpl.TAFxUsuarioID, stpl.Login, stpl.CORxEstadoID);
                }
            }
        }

        [HttpPost, Route("GetByPK")]
        public UsuariosAtivosDataSet GetByPK(UsuariosAtivosRequest pRequest, Boolean pFull = true)
        {
            var dataset = Select(pRequest, null, pFull);
            return dataset;
        }

        UsuariosAtivosDataSet IUsuariosAtivosService.Select(UsuariosAtivosFilter pFilter, Boolean pFull = false)
        {
            var dataset = Select(null, pFilter, pFull);
            return dataset;
        }

        [HttpPost, Route("Select")]
        public UsuariosAtivosDataSet Select(UsuariosAtivosRequest pRequest, UsuariosAtivosFilter pFilter, Boolean pFull)
        {
            var ctx = Context;
            var query = from TAFxUsuario in ctx.TAFxUsuario
                        select new {TAFxUsuario};

            query = _Rule?.InternalGetWhere(query,  pRequest, pFilter, pFull);

            if (pRequest != null)
                query = query.Where(q => q.TAFxUsuario.TAFxUsuarioID == pRequest.TAFxUsuarioID);

            if (pFilter != null)
            {
                if (pFilter.CORxEstadoID != null && pFilter.CORxEstadoID.State != XFieldState.Empty)
                    query = query.Where(q => q.TAFxUsuario.CORxEstadoID == pFilter.CORxEstadoID.Value);
                if (pFilter.Login != null && pFilter.Login.State != XFieldState.Empty)
                    query = query.Where(q => q.TAFxUsuario.Login == pFilter.Login.Value);
            }

            if (pFilter?.SkipRows > 0)
                query = query.Skip(pFilter.SkipRows);

            if (pFilter?.TakeRows > 0)
                query = query.Take(pFilter.TakeRows);

            var dst = query.Select(q => new UsuariosAtivosTuple(){TAFxUsuarioID = new XGuidDataField(q.TAFxUsuario.TAFxUsuarioID),
                                      Login = new XStringDataField(q.TAFxUsuario.Login),
                                      CORxEstadoID = new XInt16DataField(q.TAFxUsuario.CORxEstadoID)});
            var dataset = new UsuariosAtivosDataSet { Tuples = dst.ToList() };
            _Rule.InternalAfterSelect(dataset.Tuples);
            return dataset;
        }
    }
}