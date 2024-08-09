//<auto-generated/>
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Infrastructure;
using STX.Core;

namespace STX.Core.Automateds
{
    public  partial class STXCoreContext : XDBContext
    {

        protected STXCoreContext(DbContextOptions pOptions)
          : base(pOptions)
        {
        
        }

        public STXCoreContext(DbContextOptions<STXCoreContext> pOptions)
          : base(pOptions)
        {
        
        }

        public DbSet<CORxJob> CORxJob{get; set;}
        public DbSet<CORxJobConfiguracao> CORxJobConfiguracao{get; set;}
        protected override void OnModelCreating(ModelBuilder pBuilder)
        {
            ConfigureCORxJob(pBuilder);
            ConfigureCORxJobConfiguracao(pBuilder);
        }

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

        private void ConfigureCORxJobConfiguracao(ModelBuilder pBuilder)
        {
            pBuilder.Entity<CORxJobConfiguracao>(ett =>
            {
                ett.HasKey(e => e.CORxJobConfiguracaoID).HasName("PK_CORxJobConfiguracao");
                
                ett.Property(d => d.CORxJobConfiguracaoID).HasColumnType(GetDBType("Guid", 0, 0));
                ett.Property(d => d.Dados).HasColumnType(GetDBType("Byte[]", 0, 0));
                ett.Property(d => d.CORxJobID).HasColumnType(GetDBType("Guid", 0, 0));
                ett.ToTable("CORxJobConfiguracao");

                ett.HasOne(d => d.CORxJob)
                   .WithMany(p => p.CORxJobConfiguracao)
                   .HasForeignKey(d => d.CORxJobID)
                   .OnDelete(DeleteBehavior.Restrict)
                   .HasConstraintName("FK_F6BABB8A554A4A2CAA9BD16B8A9148F5");

                ett.HasIndex(d => d.CORxJobID).HasDatabaseName("IX_F6BABB8A554A4A2CAA9BD16B8A9148F5");
            });
        }
    }
}