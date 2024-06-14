using System;
using System.Collections.Generic;
using System.IO;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

using STX.Access;
using STX.Access.Cache;
using STX.Access.Model;
using STX.App.Core.INF;
using STX.App.Core.INF.DB;
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
            var builder = WebApplication.CreateBuilder(new WebApplicationOptions
            {
                Args = args,
                // Look for static files in "wwwroot-custom"
                WebRootPath = "/Tootega/Source/Access-POC/App/Launchers/WebUI/dist/ef6-angular-poc"
            });
            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(b =>
                b.AllowAnyOrigin()
                 .AllowAnyMethod()
                 .AllowAnyHeader()
                 .WithExposedHeaders("*"));
            });

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddControllers().AddJsonOptions(js =>
            {
                js.JsonSerializerOptions.PropertyNamingPolicy = null;
            });

            ConfigureServices(builder.Services);

            builder.Services.AddDbContext<STXAppCoreINFContext>();
            App = builder.Build();
            if (App.Environment.IsDevelopment())
            {
                App.UseSwagger();
                App.UseSwaggerUI();
            }
            App.UseHttpsRedirection();

            App.UseCors();
            App.UseAuthorization();
            App.MapControllers();
            App.UseStaticFiles();

            using var scop = App.Services.CreateScope();
            using var ctl1 = scop.ServiceProvider.GetRequiredService<STXAppCoreINFContext>();
            ctl1.Database.Migrate();

            App.Run("https://+:5000");
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
