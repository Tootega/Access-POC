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
using STX.App.Core.INF;
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
            App.Run("http://+:5000");
        }

        private static void Initialize()
        {
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
            new STXAppCoreINFModule().Initialize(pServices);

        }
    }
}
