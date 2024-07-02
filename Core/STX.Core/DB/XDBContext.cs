using System;
using System.Collections.Generic;
using System.Diagnostics;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using STX.Core.Exceptions;
using STX.Core.Interfaces;

namespace STX.Core
{
    public abstract class XEntity : XIReflectable
    {
    }

    public delegate void XOnModelCreating(ModelBuilder pBuilder);

    public enum XProvider
    {
        None,
        SQLServer,
        PostgreSQL,
        Oracle,
    }

    public class XDBContext : DbContext
    {

        public XDBContext(DbContextOptions pOptions)
            : base(pOptions)
        {
            PrepareConnection();
        }

        public XDBContext(DbContextOptions pOptions, XDBContext pContex)
            : base(pOptions)
        {
            _Owner = pContex;
            PrepareConnection();
        }

        protected List<XOnModelCreating> ToExecute = new List<XOnModelCreating>();
        private XDBContext _Owner;

        public void BeginTransaction()
        {
            if (_Owner != null)
                return;
            if (Database.CurrentTransaction == null)
                Database?.BeginTransaction();
        }

        public void Roolback()
        {
            if (_Owner != null)
                return;
            if (Database.CurrentTransaction != null)
                Database?.RollbackTransaction();
        }

        public void Commit()
        {
            if (_Owner != null)
                return;
            if (Database.CurrentTransaction != null)
                Database?.CommitTransaction();
        }

        private void PrepareConnection()
        {
            var provider = XEnvironment.Read("DB_PROVIDER", "SQLServer");
            if (provider.IsEmpty())
                throw new XError("Value for evironment variable 'DB_PROVIDER' is not found");
            Provider = Enum.Parse<XProvider>(provider);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder pBuilder)
        {
#if DEBUG
            pBuilder.EnableSensitiveDataLogging(true);
            pBuilder.LogTo(s => Debug.WriteLine(s));
            pBuilder.EnableDetailedErrors(true);
            pBuilder.EnableSensitiveDataLogging(true);
#endif
            SelectProvider(pBuilder);
            base.OnConfiguring(pBuilder);
        }

        private void SelectProvider(DbContextOptionsBuilder pBuilder)
        {
            switch (Provider)
            {
                case XProvider.SQLServer:

                    if (_Owner != null)
                    {
                        pBuilder.UseSqlServer(_Owner.Database.GetDbConnection());
                    }
                    else
                        pBuilder.UseSqlServer(GetConnectionString());
                    break;

                case XProvider.PostgreSQL:
                    pBuilder.UseNpgsql(GetConnectionString());
                    //.ReplaceService<ISqlGenerationHelper, NpgsqlSqlGenerationLowercasingHelper>();
                    break;

                case XProvider.Oracle:
                    pBuilder.UseOracle(GetConnectionString());
                    break;

                default:
                case XProvider.None:
                    throw new XError("the current provider is not known.");
            }
        }

        protected String DelimitIdentifier(String pIdentifier)
        {
            switch (Provider)
            {
                case XProvider.SQLServer:
                    return $"\"{pIdentifier}\"";

                case XProvider.PostgreSQL:
                    return $"\"{pIdentifier}\"";

                case XProvider.Oracle:
                    return $"\"{pIdentifier}\"";

                default:
                case XProvider.None:
                    throw new XError("the current provider is not known.");
            }
        }

        protected String GetConnectionString()
        {
            var stringConn = XEnvironment.Read("DB_CONNECTION", "Server=TOOTEGAWS;Initial Catalog=SITTAX-POC;Persist Security Info=False;Integrated Security=true;MultipleActiveResultSets=true;Encrypt=True;TrustServerCertificate=true;Connection Timeout=300;");
            if (!string.IsNullOrEmpty(stringConn))
                return stringConn;
            throw new XError("Value for evironment variable 'DB_CONNECTION' is not found");
        }

        public XProvider Provider
        {
            get;
            private set;
        }

        public String GetDBType(String pCSType, Int32 pLength, Int32 pScale)
        {
            switch (Provider)
            {
                case XProvider.SQLServer:
                    return GetSQLServerDBType(pCSType, pLength, pScale);

                case XProvider.PostgreSQL:
                    return GetPostgreSQLDBType(pCSType, pLength, pScale);

                case XProvider.Oracle:
                    return GetOracleDBType(pCSType, pLength, pScale);

                default:
                case XProvider.None:
                    throw new XError("the current provider is not known.");
            }
        }

        private string GetPostgreSQLDBType(string pCSType, int pLength, int pScale)
        {
            switch (pCSType)
            {
                case "DateTime":
                    return "timestamp";

                case "Byte[]":
                    return "bytea";

                case "Boolean":
                    return "boolean";

                case "Decimal":
                    return $"numeric({pLength},{pScale})";

                case "Guid":
                    return "UUID";

                case "Int16":
                    return "smallint";

                case "Int32":
                    return "integer";

                case "Int64":
                    return "bigint";

                case "String":
                    if (pLength > 0)
                        return $"varchar({pLength})";
                    else
                        return "text";

                default:
                    throw new Exception($"Não implemento conversão para tipo [{pCSType}].");
            }
        }

        public override void Dispose()
        {
            Roolback();
            base.Dispose();
        }

        private string GetOracleDBType(string pCSType, int pLength, int pScale)
        {
            switch (pCSType)
            {
                case "DateTime":
                    return "timestamp";

                case "Byte[]":
                    return "bytea";

                case "Boolean":
                    return "boolean";

                case "Decimal":
                    return $"numeric({pLength},{pScale})";

                case "Guid":
                    return "UUID";

                case "Int16":
                    return "smallint";

                case "Int32":
                    return "integer";

                case "Int64":
                    return "bigint";

                case "String":
                    if (pLength > 0)
                        return $"varchar({pLength})";
                    else
                        return "text";

                default:
                    throw new Exception($"Não implemento conversão para tipo [{pCSType}].");
            }
        }

        private static string GetSQLServerDBType(string pCSType, int pLength, int pScale)
        {
            switch (pCSType)
            {
                case "DateTime":
                    return "datetime2";

                case "Byte[]":
                    if (pLength == 0)
                        return "varbinary(max)";
                    else
                        return $"varbinary({pLength})";

                case "Boolean":
                    return "bit";

                case "Decimal":
                    return $"numeric({pLength},{pScale})";

                case "Guid":
                    return "uniqueidentifier";

                case "Int16":
                    return "smallint";

                case "Int32":
                    return "int";

                case "Int64":
                    return "bigint";

                case "String":
                    if (pLength > 0)
                        return $"nvarchar({pLength})";
                    else
                        return "nvarchar(max)";

                default:
                    throw new Exception($"Não implemento conversão para tipo [{pCSType}].");
            }
        }

        public String GetDBValue(String pCSType, Object pValue)
        {
            switch (Provider)
            {
                case XProvider.SQLServer:
                    return GetMSSQlServerDBValue(pCSType, pValue);

                case XProvider.PostgreSQL:
                    return GetPostgreSQDBValue(pCSType, pValue);

                case XProvider.Oracle:
                    return GetOracleDBValue(pCSType, pValue);

                default:
                case XProvider.None:
                    throw new XError("the current provider is not known.");
            }
        }

        private String GetOracleDBValue(string pCSType, object pValue)
        {
            switch (pCSType)
            {
                case "DateTime":
                case "Guid":
                case "String":
                    return $"{pValue?.ToString()}";

                case "Int16":
                case "Int32":
                case "Int64":
                case "Decimal":
                case "Boolean":
                    return pValue.ToString();

                default:
                    throw new Exception($"Não implemento conversão para tipo [{pCSType}].");
            }
        }

        private String GetPostgreSQDBValue(string pCSType, object pValue)
        {
            switch (pCSType)
            {
                case "DateTime":
                case "Guid":
                case "String":
                    return $"{pValue?.ToString()}";

                case "Int16":
                case "Int32":
                case "Int64":
                case "Decimal":
                case "Boolean":
                    return pValue.ToString();

                default:
                    throw new Exception($"Não implemento conversão para tipo [{pCSType}].");
            }
        }

        private static string GetMSSQlServerDBValue(string pCSType, object pValue)
        {
            switch (pCSType)
            {
                case "DateTime":
                case "Guid":
                case "String":
                    return $"{pValue?.ToString()}";

                case "Int16":
                case "Int32":
                case "Int64":
                case "Decimal":
                case "Boolean":
                    return pValue.ToString();

                default:
                    throw new Exception($"Não implemento conversão para tipo [{pCSType}].");
            }
        }

        public static IServiceProvider ServiceProvider
        {
            get;
            set;
        }

        public static IConfiguration Configuration
        {
            get;
            set;
        }

        public static IServiceCollection Services
        {
            get;
            set;
        }

        protected override void OnModelCreating(ModelBuilder pBuilder)
        {
            foreach (XOnModelCreating exe in ToExecute)
                exe.Invoke(pBuilder);
        }

        //private static void AddEntity(ModelBuilder pBuilder)
        //{
        //    foreach (Type tp in XTypeCache.GetTypes(t => t.BaseType == typeof(XEntity)))
        //        pBuilder.Entity(tp);
        //}

        //private void ApplyConfiguration(ModelBuilder pBuilder)
        //{
        //    foreach (IMutableEntityType model in pBuilder.Model.GetEntityTypes())
        //        foreach (IMutableForeignKey fk in model.GetForeignKeys().Where(fk => !fk.IsOwnership && fk.DeleteBehavior == DeleteBehavior.Cascade))
        //            fk.DeleteBehavior = DeleteBehavior.Restrict;
        //    //pBuilder.ApplyConfigurationsFromAssembly(GetType().Assembly);
        //}

        //public static void Register(IServiceCollection pServices, IConfiguration configuration)
        //{
        //    foreach (Type tp in XTypeCache.GetTypes<XController>())
        //    {
        //        if (tp.Name == "UsuarioController")
        //        {
        //        }
        //        System.Runtime.CompilerServices.RuntimeHelpers.RunClassConstructor(tp.TypeHandle);
        //    }
        //}
    }
}
