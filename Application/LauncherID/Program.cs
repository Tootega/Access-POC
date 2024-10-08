using System;
using System.Text;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;

using STX.Core;
using STX.Core.Access.Service;
using STX.Core.Cache;
using STX.Core.Interfaces;

using static System.Net.WebRequestMethods;

namespace Launcher
{
    public class Program
    {
        public static WebApplication App;

        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var athb=builder.Services.AddAuthentication(opt =>
            {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            });
            athb.AddJwtBearer(opt =>
            {
                opt.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidIssuer = "https://joydipkanjilal.com/",
                    ValidAudience = "https://joydipkanjilal.com/",
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("This is a sample secret key - please don't use in production environment.'")),
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = false,
                    ValidateIssuerSigningKey = true
                };
            });
            builder.Services.AddCors(opt =>
            {
                opt.AddDefaultPolicy(b =>
                b.AllowAnyOrigin()
                 .AllowAnyMethod()
                 .AllowAnyHeader()
                 .WithExposedHeaders("*"));
            });
            builder.Services.AddAuthorization();
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddControllers().AddJsonOptions(opt =>{opt.JsonSerializerOptions.PropertyNamingPolicy = null;});
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
            pServices.AddAuthentication(XDefault.JWTKey)
            .AddCookie(XDefault.JWTKey, o =>
            {
                o.LoginPath = "/Access/Login";
                o.Cookie.Name = XDefault.JWTKey;
                o.Cookie.Path = "/";
            });
            pServices.Configure<KestrelServerOptions>(options =>
            {
                options.AllowSynchronousIO = true;
            });

        }
    }
}
