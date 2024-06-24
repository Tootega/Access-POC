//<auto-generated/>
using System;
using System.Linq;
using System.Collections.Generic;
using System.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using STX.Core;
using STX.Core.Access.DB;
using STX.Core.Model;
using STX.Core.Services;
using STX.App.Core.INF.Menu;
using STX.App.Core.INF.DB;

namespace STX.App.Core.INF.Menu
{
    public class UserManuService : XService, IUserManuService
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

            internal DbSet<CORxRecurso> CORxRecurso{get; set;}
            internal DbSet<CORxMenuItem> CORxMenuItem{get; set;}

            private void ConfigureCORxRecurso(ModelBuilder pBuilder)
            {
                pBuilder.Entity<CORxRecurso>(ett =>
                {
                    ett.HasKey(e => e.CORxRecursoID).HasName("PK_CORxRecurso");
                    
                    ett.Property(d => d.CORxRecursoID).HasColumnType(GetDBType("Guid", 0, 0));
                    ett.Property(d => d.Nome).HasColumnType(GetDBType("String", 128, 0));
                    ett.Property(d => d.CORxMenuItemID).HasColumnType(GetDBType("Guid", 0, 0));
                    ett.ToTable("CORxRecurso");

                    ett.HasOne(d => d.CORxMenuItem)
                       .WithMany(p => p.CORxRecurso)
                       .HasForeignKey(d => d.CORxMenuItemID)
                       .OnDelete(DeleteBehavior.Restrict)
                       .HasConstraintName("FK_DD2B2F889A7341ACB8763984D8EB927F");

                    ett.HasIndex(d => d.CORxMenuItemID).HasDatabaseName("IX_DD2B2F889A7341ACB8763984D8EB927F");
                });
            }
            private void ConfigureCORxMenuItem(ModelBuilder pBuilder)
            {
                pBuilder.Entity<CORxMenuItem>(ett =>
                {
                    ett.HasKey(e => e.CORxMenuItemID).HasName("PK_CORxMenuItem");
                    
                    ett.Property(d => d.CORxMenuItemID).HasColumnType(GetDBType("Guid", 0, 0));
                    ett.Property(d => d.Nome).HasColumnType(GetDBType("String", 50, 0));
                    ett.Property(d => d.CORxMenuItemPaiID).HasColumnType(GetDBType("Guid", 0, 0));
                    ett.Property(d => d.Icone).HasColumnType(GetDBType("String", 128, 0));
                    ett.ToTable("CORxMenuItem");

                    ett.HasOne(d => d.ItemPai)
                       .WithMany(p => p.ItensFilhos)
                       .HasForeignKey(d => d.CORxMenuItemPaiID)
                       .OnDelete(DeleteBehavior.Restrict)
                       .HasConstraintName("FK_089E501462F24B4CB82B6401E77C1CD9");

                    ett.HasIndex(d => d.CORxMenuItemPaiID).HasDatabaseName("IX_089E501462F24B4CB82B6401E77C1CD9");
                });
            }

            protected override void OnModelCreating(ModelBuilder pBuilder)
            {
                ConfigureCORxRecurso(pBuilder);
                ConfigureCORxMenuItem(pBuilder);
            }
        }

        public UserManuService(XService pOwner)
               :base(pOwner)
        {
            _Rule = new UserManuRule(this);
        }

        public UserManuService(ILogger<XService> pLogger)
               :base(pLogger)
        {
            _Rule = new UserManuRule(this);
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

        public UserManuDataSet GetByPK(UserManuRequest pRequest, Boolean pFull = true)
        {
            var dataset = Select(pRequest, null, pFull);
            return dataset;
        }

        UserManuDataSet IUserManuService.Select(UserManuFilter pFilter, Boolean pFull = false)
        {
            var dataset = Select(null, pFilter, pFull);
            return dataset;
        }

        public UserManuDataSet Select(UserManuRequest pRequest, UserManuFilter pFilter, Boolean pFull)
        {
            var ctx = Context;
            var query = from CORxRecurso in ctx.CORxRecurso
                        join CORxMenuItem in ctx.CORxMenuItem on CORxRecurso.CORxMenuItemID equals CORxMenuItem.CORxMenuItemID
                        select new {CORxRecurso, CORxMenuItem};

            query = _Rule?.InternalGetWhere(query,  pRequest, pFilter, pFull);

            if (pRequest != null)
                query = query.Where(q => q.CORxRecurso.CORxRecursoID == pRequest.CORxRecursoID);

            if (pFilter != null)
            {
                if (pFilter.CORxRecursoID != null && pFilter.CORxRecursoID.State != XFieldState.Empty)
                    query = query.Where(q => q.CORxRecurso.CORxRecursoID == pFilter.CORxRecursoID.Value);
            }

            if (pFilter?.SkipRows > 0)
                query = query.Skip(pFilter.SkipRows);

            if (pFilter?.TakeRows > 0)
                query = query.Take(pFilter.TakeRows);

            var dst = query.Select(q => new UserManuTuple(){CORxRecursoID = new XGuidDataField(q.CORxRecurso.CORxRecursoID),
                                Titulo = new XStringDataField(q.CORxRecurso.Nome),
                                Ordem = new XInt32DataField(0),
                                Modulo = new XStringDataField(q.CORxMenuItem.Nome),
                                Icone = new XStringDataField(q.CORxMenuItem.Icone),
                                CORxMenuItemID = new XGuidDataField(q.CORxRecurso.CORxMenuItemID),
                                CORxMenuItemPaiID = new XGuidDataField(q.CORxMenuItem.CORxMenuItemPaiID)});
            var dataset = new UserManuDataSet { Tuples = dst.ToList() };
            _Rule.InternalAfterSelect(dataset.Tuples);
            return dataset;
        }
    }
}