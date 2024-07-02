using System;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

using STX.Core;
using STX.Core.Access.Service;
using STX.Core.Cache;
using STX.Core.Interfaces;

namespace Launcher
{
    public class Program
    {
        public static WebApplication App;

        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
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
            builder.Services.AddControllers().AddJsonOptions(jsonOptions =>
            {
                jsonOptions.JsonSerializerOptions.PropertyNamingPolicy = null;
            });
            ConfigureServices(builder.Services);
            builder.Services.AddSingleton<XILoginService, XLoginService>();
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
            Initialize(App.Services);

            XSessionManager.Initialize(App.Services);
            App.Run("https://+:5000");
        }

        private static void Initialize(IServiceProvider pServices)
        {
            var svc = (XLoginService)pServices.GetService<XILoginService>();
            svc.RefreshCache();
        }

        public static void ConfigureServices(IServiceCollection pServices)
        {
            pServices.AddRouting();
            pServices.AddAuthentication(XDefault.AuthenticationSchemes)
            .AddCookie(XDefault.AuthenticationSchemes, o =>
            {
                o.LoginPath = "/Access/Login";
                o.Cookie.Name = XDefault.AuthenticationSchemes;
                o.Cookie.Path = "/";
            });
            pServices.Configure<KestrelServerOptions>(options =>
            {
                options.AllowSynchronousIO = true;
            });

        }
    }
}
