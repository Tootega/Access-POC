using System;
using System.Collections.Generic;
using System.IO;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

using STX.Access;
using STX.Access.Cache;
using STX.Access.Model;
using STX.Core.Access.Usuarios;
using STX.Core.Services;

namespace Launcher
{
    public class Program
    {
        public static WebApplication App;

        public static void Main(string[] args)
        {
            Initialize();
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddControllers().AddJsonOptions(jsonOptions =>
            {
                jsonOptions.JsonSerializerOptions.PropertyNamingPolicy = null;
            });

            ConfigureServices(builder.Services);

            App = builder.Build();
            if (App.Environment.IsDevelopment())
            {
                App.UseSwagger();
                App.UseSwaggerUI();
            }
            App.UseHttpsRedirection();

            App.UseAuthorization();


            App.MapControllers();
            XSessionManager.RefreshCache += GetUsers;
            XSessionManager.DoRefreshCache();
            App.Run("http://+:5000");
        }

        private static Dictionary<string, XUser> GetUsers()
        {
            var usr = new Dictionary<string, XUser>();
            using var srv = new UsuariosAtivosService((XService)null);
            var dst = srv.Select(null, null, true);
            foreach (var item in dst.Tuples)
            {
                usr.Add(item.Login.Value, new XUser { ID =item.TAFxUsuarioID.Value.Value, Login = item.Login.Value });
            }

            return usr;
        }

        private static void Initialize()
        {
            XSessionCache.Users = new XCacheUser();
            //var data = File.ReadAllLines(@"D:\Tootega\Source\Access-POC\Tests\Assets\Users.csv");
            //var users = new Dictionary<string, XUser>();
            //for (int i = 0; i < 1_000_000; i++)
            //    users.Add(data[i], new XUser { ID = Guid.NewGuid(), Login = data[i] });
            //XSessionCache.Users.Swap(users);
        }

        public static void ConfigureServices(IServiceCollection pServices)
        {
            pServices.AddRouting();
            pServices.AddAuthentication(XTAFDefault.AuthenticationSchemes)

            .AddCookie(XTAFDefault.AuthenticationSchemes, o =>
            {
                o.LoginPath = "/Access/Login";
                o.Cookie.Name = XTAFDefault.AuthenticationSchemes;
                o.Cookie.Path = "/";
            });
            pServices.Configure<KestrelServerOptions>(options =>
            {
                options.AllowSynchronousIO = true;
            });
        }
    }
}
