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
using STX.App.Core.INF.Perfil;
using STX.App.Core.INF.DB;

namespace STX.App.Core.INF.Perfil
{
    [XGuid("89FA5B9A-14F4-4989-BE06-DCD2A3E4428F", typeof(IPerfilService))]
    public class PerfilService : XService, IPerfilService
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

            internal DbSet<CORxPerfil> CORxPerfil{get; set;}
            internal DbSet<CORxPerfilDireiro> CORxPerfilDireiro{get; set;}
            internal DbSet<CORxDireiro> CORxDireiro{get; set;}
            internal DbSet<CORxRecursoDireito> CORxRecursoDireito{get; set;}
            internal DbSet<CORxRecurso> CORxRecurso{get; set;}
            internal DbSet<CORxEstado> CORxEstado{get; set;}

            private void ConfigureCORxPerfil(ModelBuilder pBuilder)
            {
                pBuilder.Entity<CORxPerfil>(ett =>
                {
                    ett.HasKey(e => e.CORxPerfilID).HasName("PK_CORxPerfil");
                    
                    ett.Property(d => d.CORxPerfilID).HasColumnType(GetDBType("Guid", 0, 0));
                    ett.Property(d => d.Nome).HasColumnType(GetDBType("String", 45, 0));
                    ett.ToTable("CORxPerfil");
                });
            }
            private void ConfigureCORxPerfilDireiro(ModelBuilder pBuilder)
            {
                pBuilder.Entity<CORxPerfilDireiro>(ett =>
                {
                    ett.HasKey(e => e.CORxPerfilDireiroID).HasName("PK_CORxPerfilDireiro");
                    
                    ett.Property(d => d.CORxPerfilDireiroID).HasColumnType(GetDBType("Guid", 0, 0));
                    ett.Property(d => d.CORxPerfilID).HasColumnType(GetDBType("Guid", 0, 0));
                    ett.Property(d => d.SYSxEstadoID).HasColumnType(GetDBType("Int16", 0, 0));
                    ett.Property(d => d.CORxRecursoDireitoID).HasColumnType(GetDBType("Guid", 0, 0));
                    ett.ToTable("CORxPerfilDireiro");

                    ett.HasOne(d => d.CORxPerfil)
                       .WithMany(p => p.CORxPerfilDireiro)
                       .HasForeignKey(d => d.CORxPerfilID)
                       .OnDelete(DeleteBehavior.Restrict)
                       .HasConstraintName("FK_DB2EF4796E004A85B4BBEC4BAFB60B61");

                    ett.HasOne(d => d.CORxRecursoDireito)
                       .WithMany(p => p.CORxPerfilDireiro)
                       .HasForeignKey(d => d.CORxRecursoDireitoID)
                       .OnDelete(DeleteBehavior.Restrict)
                       .HasConstraintName("FK_43FA8B4D965A44388AB05C4C95CD4120");

                    ett.HasOne(d => d.CORxEstado)
                       .WithMany(p => p.CORxPerfilDireiro)
                       .HasForeignKey(d => d.SYSxEstadoID)
                       .OnDelete(DeleteBehavior.Restrict)
                       .HasConstraintName("FK_C81CBAAB358F4F87B64A7EFD7808B76B");

                    ett.HasIndex(d => d.CORxPerfilID).HasDatabaseName("IX_DB2EF4796E004A85B4BBEC4BAFB60B61");
                    ett.HasIndex(d => d.SYSxEstadoID).HasDatabaseName("IX_C81CBAAB358F4F87B64A7EFD7808B76B");
                    ett.HasIndex(d => d.CORxRecursoDireitoID).HasDatabaseName("IX_43FA8B4D965A44388AB05C4C95CD4120");

                    ett.HasIndex(e => new { e.CORxPerfilID, e.CORxPerfilDireiroID })
                        .IsUnique()
                        .HasDatabaseName("IX_8EA98120_28B4_458C_946B_E9B0000C518D");
                });
            }
            private void ConfigureCORxDireiro(ModelBuilder pBuilder)
            {
                pBuilder.Entity<CORxDireiro>(ett =>
                {
                    ett.HasKey(e => e.CORxDireiroID).HasName("PK_CORxDireiro");
                    
                    ett.Property(d => d.CORxDireiroID).HasColumnType(GetDBType("Guid", 0, 0));
                    ett.Property(d => d.Direito).HasColumnType(GetDBType("String", 45, 0));
                    ett.ToTable("CORxDireiro");
                });
            }
            private void ConfigureCORxRecursoDireito(ModelBuilder pBuilder)
            {
                pBuilder.Entity<CORxRecursoDireito>(ett =>
                {
                    ett.HasKey(e => e.CORxRecursoDireitoID).HasName("PK_CORxRecursoDireito");
                    
                    ett.Property(d => d.CORxRecursoDireitoID).HasColumnType(GetDBType("Guid", 0, 0));
                    ett.Property(d => d.CORxDireiroID).HasColumnType(GetDBType("Guid", 0, 0));
                    ett.Property(d => d.CORxRecursoID).HasColumnType(GetDBType("Guid", 0, 0));
                    ett.Property(d => d.SYSxEstadoID).HasColumnType(GetDBType("Int16", 0, 0));
                    ett.ToTable("CORxRecursoDireito");

                    ett.HasOne(d => d.CORxDireiro)
                       .WithMany(p => p.CORxRecursoDireito)
                       .HasForeignKey(d => d.CORxDireiroID)
                       .OnDelete(DeleteBehavior.Restrict)
                       .HasConstraintName("FK_FEBE37E773C04510917C09AA991BA695");

                    ett.HasOne(d => d.CORxEstado)
                       .WithMany(p => p.CORxRecursoDireito)
                       .HasForeignKey(d => d.SYSxEstadoID)
                       .OnDelete(DeleteBehavior.Restrict)
                       .HasConstraintName("FK_662808A15CC541869E041EB76DBF81F2");

                    ett.HasOne(d => d.CORxRecurso)
                       .WithMany(p => p.CORxRecursoDireito)
                       .HasForeignKey(d => d.CORxRecursoID)
                       .OnDelete(DeleteBehavior.Restrict)
                       .HasConstraintName("FK_63A2BC55DE5B48F9B50DB67210086133");

                    ett.HasIndex(d => d.CORxDireiroID).HasDatabaseName("IX_FEBE37E773C04510917C09AA991BA695");
                    ett.HasIndex(d => d.CORxRecursoID).HasDatabaseName("IX_63A2BC55DE5B48F9B50DB67210086133");
                    ett.HasIndex(d => d.SYSxEstadoID).HasDatabaseName("IX_662808A15CC541869E041EB76DBF81F2");

                    ett.HasIndex(e => new { e.CORxDireiroID, e.CORxRecursoID })
                        .IsUnique()
                        .HasDatabaseName("IX_29FB7252_4D26_4B87_85F7_DED1FB18AC29");
                });
            }
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
            private void ConfigureCORxEstado(ModelBuilder pBuilder)
            {
                pBuilder.Entity<CORxEstado>(ett =>
                {
                    ett.HasKey(e => e.CORxEstadoID).HasName("PK_CORxEstado");
                    
                    ett.Property(d => d.CORxEstadoID).HasColumnType(GetDBType("Int16", 0, 0));
                    ett.Property(d => d.Estado).HasColumnType(GetDBType("String", 20, 0));
                    ett.ToTable("CORxEstado");
                });
            }

            protected override void OnModelCreating(ModelBuilder pBuilder)
            {
                ConfigureCORxPerfil(pBuilder);
                ConfigureCORxPerfilDireiro(pBuilder);
                ConfigureCORxDireiro(pBuilder);
                ConfigureCORxRecursoDireito(pBuilder);
                ConfigureCORxRecurso(pBuilder);
                ConfigureCORxEstado(pBuilder);
            }
        }

        public PerfilService(XService pOwner)
               :base(pOwner)
        {
            _Rule = new PerfilRule(this);
        }

        public PerfilService(ILogger<XService> pLogger)
               :base(pLogger)
        {
            _Rule = new PerfilRule(this);
        }

        private XIServiceRuleC _Rule;

        public override Guid ID => new Guid("89FA5B9A-14F4-4989-BE06-DCD2A3E4428F");

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
        public void Flush(PerfilDataSet pDataSet)
        {
            XIServiceRule PerfilDireitoRule = new PerfilDireitoRule(this);

            var ctx = GetContext<DBContext>();
            ctx.BeginTransaction();
                PerfilDireitoRule?.InternalBeforeFlush(pDataSet.Tuples.SelectManyEx(t => t.PerfilDireito).ToList());
            _Rule?.InternalBeforeFlush(pDataSet.Tuples);

            SetPerfilValues(ctx, pDataSet);
            ctx.SaveChanges();

                PerfilDireitoRule?.InternalAfterFlush(pDataSet.Tuples.SelectManyEx(t => t.PerfilDireito).ToList());
            _Rule?.InternalAfterFlush(pDataSet.Tuples);

            ctx.Commit();
        }

        private void SetPerfilValues(DBContext ctx, PerfilDataSet pDataSet)
        {
            if (pDataSet == null || pDataSet.Tuples == null)
                return;
            foreach (PerfilTuple stpl in pDataSet.Tuples)
            {
                if (HasChanges(stpl, stpl.CORxPerfilID, stpl.Nome))
                {
                    var CORxPerfiltpl = new CORxPerfil();
                    CORxPerfiltpl.CORxPerfilID = stpl.CORxPerfilID.Value;
                    CORxPerfiltpl.Nome = stpl.Nome.Value;
                    var tbl = ctx.CORxPerfil.Add(CORxPerfiltpl);
                    tbl.State = GetState(stpl, stpl.CORxPerfilID, stpl.Nome);
                }
                SetPerfilDireitoValues(ctx, stpl.PerfilDireito);
            }
        }

        private void SetPerfilDireitoValues(DBContext ctx, PerfilDireitoTuple[] pTuples)
        {
            if (pTuples == null)
                return;
            foreach (PerfilDireitoTuple stpl in pTuples)
            {
                if (HasChanges(stpl, stpl.CORxPerfilDireiroID, stpl.CORxPerfilID, stpl.SYSxEstadoID, stpl.CORxRecursoDireitoID))
                {
                    var CORxPerfilDireirotpl = new CORxPerfilDireiro();
                    CORxPerfilDireirotpl.CORxPerfilDireiroID = stpl.CORxPerfilDireiroID.Value;
                    CORxPerfilDireirotpl.CORxPerfilID = stpl.CORxPerfilID.Value;
                    CORxPerfilDireirotpl.SYSxEstadoID = stpl.SYSxEstadoID.Value;
                    CORxPerfilDireirotpl.CORxRecursoDireitoID = stpl.CORxRecursoDireitoID.Value;
                    var tbl = ctx.CORxPerfilDireiro.Add(CORxPerfilDireirotpl);
                    tbl.State = GetState(stpl, stpl.CORxPerfilDireiroID, stpl.CORxPerfilID, stpl.SYSxEstadoID, stpl.CORxRecursoDireitoID);
                }
            }
        }

        public PerfilDataSet GetByPK(PerfilRequest pRequest, Boolean pFull = true)
        {
            var dataset = Select(pRequest, null, pFull);
            return dataset;
        }

        PerfilDataSet IPerfilService.Select(PerfilFilter pFilter, Boolean pFull = false)
        {
            var dataset = Select(null, pFilter, pFull);
            return dataset;
        }

        public PerfilDataSet Select(PerfilRequest pRequest, PerfilFilter pFilter, Boolean pFull)
        {
            var ctx = Context;
            var query = from CORxPerfil in ctx.CORxPerfil
                        select new {CORxPerfil};

            query = _Rule?.InternalGetWhere(query,  pRequest, pFilter, pFull);

            if (pRequest != null)
                query = query.Where(q => q.CORxPerfil.CORxPerfilID == pRequest.CORxPerfilID);

            if (pFilter != null)
            {
                if (pFilter.Nome != null && pFilter.Nome.State != XFieldState.Empty)
                    query = query.Where(q => EF.Functions.Like(q.CORxPerfil.Nome, "%" + pFilter.Nome.Value + "%"));
            }

            if (pFilter?.SkipRows > 0)
                query = query.Skip(pFilter.SkipRows);

            if (pFilter?.TakeRows > 0)
                query = query.Take(pFilter.TakeRows);

            var PerfilDireito = pFull ? from CORxPerfilDireiro in ctx.CORxPerfilDireiro
                        join CORxRecursoDireito in ctx.CORxRecursoDireito on CORxPerfilDireiro.CORxRecursoDireitoID equals CORxRecursoDireito.CORxRecursoDireitoID
                        join CORxRecurso in ctx.CORxRecurso on CORxRecursoDireito.CORxRecursoID equals CORxRecurso.CORxRecursoID
                        join CORxDireiro in ctx.CORxDireiro on CORxRecursoDireito.CORxDireiroID equals CORxDireiro.CORxDireiroID
                        join CORxEstado in ctx.CORxEstado on CORxRecursoDireito.SYSxEstadoID equals CORxEstado.CORxEstadoID
                        select new {CORxPerfilDireiro, CORxDireiro, CORxRecursoDireito, CORxRecurso, CORxEstado} : null; 

            var dst = query.Select(q => new PerfilTuple(){CORxPerfilID = new XGuidDataField(q.CORxPerfil.CORxPerfilID),
                              Nome = new XStringDataField(q.CORxPerfil.Nome), PerfilDireito = 
                              pFull ? PerfilDireito.Where(q1 => q1.CORxPerfilDireiro.CORxPerfilID == q.CORxPerfil.CORxPerfilID )
                            .Select(q => new PerfilDireitoTuple(){CORxPerfilID = new XGuidDataField(q.CORxPerfilDireiro.CORxPerfilID),
                                     Direito = new XStringDataField(q.CORxDireiro.Direito),
                                     Estado = new XStringDataField(q.CORxEstado.Estado),
                                     Nome = new XStringDataField(q.CORxRecurso.Nome),
                                     SYSxEstadoID = new XInt16DataField(q.CORxPerfilDireiro.SYSxEstadoID),
                                     CORxPerfilDireiroID = new XGuidDataField(q.CORxPerfilDireiro.CORxPerfilDireiroID),
                                     CORxRecursoDireitoID = new XGuidDataField(q.CORxPerfilDireiro.CORxRecursoDireitoID)}).ToArray() : null});
            var dataset = new PerfilDataSet { Tuples = dst.ToList() };
            _Rule.InternalAfterSelect(dataset.Tuples);
            return dataset;
        }
    }
}