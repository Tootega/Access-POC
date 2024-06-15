//<auto-generated/>
using STX.Core.Access.DB;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Infrastructure;
using STX.Core;

namespace STX.App.Core.INF.DB
{
    public class STXAppCoreINFContext : STXCoreAccessContext
    {

        protected STXAppCoreINFContext(DbContextOptions pOptions)
          : base(pOptions)
        {
        
        }

        public STXAppCoreINFContext(DbContextOptions<STXAppCoreINFContext> pOptions)
          : base(pOptions)
        {
        
        }

        public DbSet<CORxDireiro> CORxDireiro{get; set;}
        public DbSet<CORxEstado> CORxEstado{get; set;}
        public DbSet<CORxMenuItem> CORxMenuItem{get; set;}
        public DbSet<CORxPerfil> CORxPerfil{get; set;}
        public DbSet<CORxPerfilDireiro> CORxPerfilDireiro{get; set;}
        public DbSet<CORxPessoa> CORxPessoa{get; set;}
        public DbSet<CORxRecurso> CORxRecurso{get; set;}
        public DbSet<CORxRecursoDireito> CORxRecursoDireito{get; set;}
        public DbSet<CORxTenat> CORxTenat{get; set;}
        public DbSet<CORxUsuario> CORxUsuario{get; set;}
        public DbSet<CORxUsuarioPerfil> CORxUsuarioPerfil{get; set;}
        protected override void OnModelCreating(ModelBuilder pBuilder)
        {
            ConfigureCORxDireiro(pBuilder);
            ConfigureCORxEstado(pBuilder);
            ConfigureCORxMenuItem(pBuilder);
            ConfigureCORxPerfil(pBuilder);
            ConfigureCORxPerfilDireiro(pBuilder);
            ConfigureCORxPessoa(pBuilder);
            ConfigureCORxRecurso(pBuilder);
            ConfigureCORxRecursoDireito(pBuilder);
            ConfigureCORxTenat(pBuilder);
            ConfigureCORxUsuario(pBuilder);
            ConfigureCORxUsuarioPerfil(pBuilder);
        }

        private void ConfigureCORxDireiro(ModelBuilder pBuilder)
        {
            pBuilder.Entity<CORxDireiro>(ett =>
            {
                ett.HasKey(e => e.CORxDireiroID).HasName("PK_CORxDireiro");
                
                ett.Property(d => d.CORxDireiroID).HasColumnType(GetDBType("Guid", 0, 0));
                ett.Property(d => d.Direito).HasColumnType(GetDBType("String", 45, 0));
                ett.ToTable("CORxDireiro");
                ett.HasData(STX.App.Core.INF.DB.CORxDireiro.XDefault.SeedData);
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
                ett.HasData(STX.App.Core.INF.DB.CORxEstado.XDefault.SeedData);
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
                ett.HasData(STX.App.Core.INF.DB.CORxMenuItem.XDefault.SeedData);
            });
        }

        private void ConfigureCORxPerfil(ModelBuilder pBuilder)
        {
            pBuilder.Entity<CORxPerfil>(ett =>
            {
                ett.HasKey(e => e.CORxPerfilID).HasName("PK_CORxPerfil");
                
                ett.Property(d => d.CORxPerfilID).HasColumnType(GetDBType("Guid", 0, 0));
                ett.Property(d => d.Nome).HasColumnType(GetDBType("String", 45, 0));
                ett.ToTable("CORxPerfil");
                ett.HasData(STX.App.Core.INF.DB.CORxPerfil.XDefault.SeedData);
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
                ett.HasData(STX.App.Core.INF.DB.CORxPerfilDireiro.XDefault.SeedData);
            });
        }

        private void ConfigureCORxPessoa(ModelBuilder pBuilder)
        {
            pBuilder.Entity<CORxPessoa>(ett =>
            {
                ett.HasKey(e => e.CORxPessoaID).HasName("PK_CORxPessoa");
                
                ett.Property(d => d.CORxPessoaID).HasColumnType(GetDBType("Guid", 0, 0));
                ett.Property(d => d.Nome).HasColumnType(GetDBType("String", 256, 0));
                ett.ToTable("CORxPessoa");
                ett.HasData(STX.App.Core.INF.DB.CORxPessoa.XDefault.SeedData);
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
                ett.HasData(STX.App.Core.INF.DB.CORxRecurso.XDefault.SeedData);
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
                ett.HasData(STX.App.Core.INF.DB.CORxRecursoDireito.XDefault.SeedData);
            });
        }

        private void ConfigureCORxTenat(ModelBuilder pBuilder)
        {
            pBuilder.Entity<CORxTenat>(ett =>
            {
                ett.HasKey(e => e.CORxTenatID).HasName("PK_CORxTenat");
                
                ett.Property(d => d.CORxTenatID).HasColumnType(GetDBType("Guid", 0, 0));
                ett.ToTable("CORxTenat");

                ett.HasOne(d => d.CORxPessoa)
                   .WithMany()
                   .HasForeignKey(d => d.CORxTenatID)
                   .OnDelete(DeleteBehavior.Restrict)
                   .HasConstraintName("FK_7763556284A541589093B4B776F38198");

                ett.HasIndex(d => d.CORxTenatID).HasDatabaseName("IX_7763556284A541589093B4B776F38198");
            });
        }

        private void ConfigureCORxUsuario(ModelBuilder pBuilder)
        {
            pBuilder.Entity<CORxUsuario>(ett =>
            {
                ett.HasKey(e => e.CORxUsuarioID).HasName("PK_CORxUsuario");
                
                ett.Property(d => d.CORxUsuarioID).HasColumnType(GetDBType("Guid", 0, 0));
                ett.Property(d => d.CORxPessoaID).HasColumnType(GetDBType("Guid", 0, 0));
                ett.ToTable("CORxUsuario");

                ett.HasOne(d => d.TAFxUsuario)
                   .WithMany()
                   .HasForeignKey(d => d.CORxUsuarioID)
                   .OnDelete(DeleteBehavior.Restrict)
                   .HasConstraintName("FK_74C786F513D84B83B262F901573BCE27");

                ett.HasOne(d => d.CORxPessoa)
                   .WithMany(p => p.CORxUsuario)
                   .HasForeignKey(d => d.CORxPessoaID)
                   .OnDelete(DeleteBehavior.Restrict)
                   .HasConstraintName("FK_C9471B8665C04206AC2FBA967434C37A");

                ett.HasIndex(d => d.CORxUsuarioID).HasDatabaseName("IX_74C786F513D84B83B262F901573BCE27");
                ett.HasIndex(d => d.CORxPessoaID).HasDatabaseName("IX_C9471B8665C04206AC2FBA967434C37A");
                ett.HasData(STX.App.Core.INF.DB.CORxUsuario.XDefault.SeedData);
            });
        }

        private void ConfigureCORxUsuarioPerfil(ModelBuilder pBuilder)
        {
            pBuilder.Entity<CORxUsuarioPerfil>(ett =>
            {
                ett.HasKey(e => e.CORxUsuarioPerfilID).HasName("PK_CORxUsuarioPerfil");
                
                ett.Property(d => d.CORxUsuarioPerfilID).HasColumnType(GetDBType("Guid", 0, 0));
                ett.Property(d => d.CORxUsuarioID).HasColumnType(GetDBType("Guid", 0, 0));
                ett.Property(d => d.CORxPerfilID).HasColumnType(GetDBType("Guid", 0, 0));
                ett.Property(d => d.SYSxEstadoID).HasColumnType(GetDBType("Int16", 0, 0));
                ett.ToTable("CORxUsuarioPerfil");

                ett.HasOne(d => d.CORxPerfil)
                   .WithMany(p => p.CORxUsuarioPerfil)
                   .HasForeignKey(d => d.CORxPerfilID)
                   .OnDelete(DeleteBehavior.Restrict)
                   .HasConstraintName("FK_A1545961E23B49F9A6C3797816459BA6");

                ett.HasOne(d => d.CORxUsuario)
                   .WithMany(p => p.CORxUsuarioPerfil)
                   .HasForeignKey(d => d.CORxUsuarioID)
                   .OnDelete(DeleteBehavior.Restrict)
                   .HasConstraintName("FK_277FC3C02F294E4BB98861248A39AF3E");

                ett.HasOne(d => d.CORxEstado)
                   .WithMany(p => p.CORxUsuarioPerfil)
                   .HasForeignKey(d => d.SYSxEstadoID)
                   .OnDelete(DeleteBehavior.Restrict)
                   .HasConstraintName("FK_DF6B83584AFE4750963FA1CCDD988B7A");

                ett.HasIndex(d => d.CORxUsuarioID).HasDatabaseName("IX_277FC3C02F294E4BB98861248A39AF3E");
                ett.HasIndex(d => d.CORxPerfilID).HasDatabaseName("IX_A1545961E23B49F9A6C3797816459BA6");
                ett.HasIndex(d => d.SYSxEstadoID).HasDatabaseName("IX_DF6B83584AFE4750963FA1CCDD988B7A");

                ett.HasIndex(e => new { e.CORxUsuarioID, e.CORxPerfilID })
                    .IsUnique()
                    .HasDatabaseName("IX_41898A44_44C6_4757_BCD7_45183345E9D3");
            });
        }
    }
}