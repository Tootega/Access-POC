using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

using AspNetCore.Scalar;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;
using Microsoft.OpenApi.Models;

using Swashbuckle.AspNetCore.SwaggerGen;

using TFX.Core;
using TFX.Core.Controllers;
using TFX.Core.Extensions;

public static class XServiceExtensions
{
    public static void ConfigureServices(this IServiceCollection pServices)
    {
        pServices.AddJWT();
        pServices.AddCors(options =>
        {
            options.AddDefaultPolicy(b => b.AllowAnyOrigin()
                                           .AllowAnyMethod()
                                           .AllowAnyHeader()
                                           .WithExposedHeaders("*"));
        });

        pServices.AddControllers();
        pServices.AddEndpointsApiExplorer();
        pServices.AddSwaggerGen();
        pServices.AddControllers().AddJsonOptions(js => { js.JsonSerializerOptions.PropertyNamingPolicy = null; });
        pServices.AddControllers().ConfigureApiBehaviorOptions(options =>
        {
            options.InvalidModelStateResponseFactory = context => { return new BadRequestObjectResult(XMLResponse.BadJSon); };

        }).AddJsonOptions(options => { options.JsonSerializerOptions.PropertyNamingPolicy = null; });

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
    public static void AddJWT(this IServiceCollection pService)
    {
        pService.AddHttpContextAccessor();
        pService.AddAuthentication(x =>
        {
            x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(opt =>
        {
            opt.RequireHttpsMetadata = false;
            opt.SaveToken = true;
            opt.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,

                ValidateAudience = true,

                ValidateIssuerSigningKey = true,
                ValidateLifetime = true,
                RequireExpirationTime = true,
                ClockSkew = TimeSpan.Zero,
                IssuerSigningKeyResolver = (token, secutiryToken, kid, validationParameters) =>
                {
                    SecurityKey issuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(XDefault.JWTKey));
                    return new List<SecurityKey>() { issuerSigningKey };
                },
                NameClaimType = "Tootega.TFX.Core.ID.Claim",
                AudienceValidator = AudienceValidator,
                IssuerValidator = IssuerValidator
            };
            opt.Events = new JwtBearerEvents
            {
                OnMessageReceived = context =>
                {
                    var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
                    context.Token = token;
                    return Task.CompletedTask;
                }
            };
        });
    }

    private static string IssuerValidator(string issuer, SecurityToken securitytoken, TokenValidationParameters validationparameters)
    {
        validationparameters.ValidIssuer = XDefault.Emissor;

        return string.Empty;
    }

    private static bool AudienceValidator(IEnumerable<string> audiences, SecurityToken securityToken, TokenValidationParameters validationParameters)
    {
        validationParameters.ValidAudiences = XDefault.ValidoEm;

        return true;
    }
    public static IServiceCollection UseOpenApi(this IServiceCollection pService)
    {
        pService.AddEndpointsApiExplorer();
        pService.AddOpenApi(opt =>
        {
            opt.OpenApiVersion = OpenApiSpecVersion.OpenApi3_0;
        });
        pService.AddSwaggerGen(c =>
        {
            c.CustomSchemaIds(type => type.FullName);
            c.SwaggerGeneratorOptions.DescribeAllParametersInCamelCase = true;
            var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
            var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
            if (File.Exists(xmlPath))
            {
                c.IncludeXmlComments(xmlPath);
                c.SchemaFilter<EnumSchemaFilter>(xmlPath);
            }
            c.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = AppDomain.CurrentDomain.FriendlyName,
                Version = "v1",
                Description = $"API {AppDomain.CurrentDomain.FriendlyName}",
                Contact = new OpenApiContact
                {
                    Name = "Tootega Pesquisa e Inovação",
                    Url = new Uri("https://github.com/Tootega/"),
                    Email = "comercial@tootega.com.br"
                }
            });

            c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Description = "'Bearer' [spaço] seu token | Exemplo: Bearer 1212123123131",
                Name = "Authorization",
                BearerFormat = "JWT",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.ApiKey,
                Scheme = "Bearer"
            });

            c.AddSecurityRequirement(new OpenApiSecurityRequirement()
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        },
                        Scheme = "Bearer",
                        Name = "Bearer",
                        In = ParameterLocation.Header,
                    },
                    new string[] {}
                }
            });
        });

        return pService;
    }

    public static WebApplication AddScalar(this WebApplication pApp)
    {
        if (!(pApp.Environment.IsDevelopment() || XEnvironment.AtivarScalar))
            return pApp;

        pApp.UseSwagger();
        pApp.UseScalar(options =>
        {
            options.RoutePrefix = "docs";
            options.DocumentTitle = $"API ({AppDomain.CurrentDomain.FriendlyName})";
            options.UseTheme(Theme.Mars);
        });
        pApp.MapOpenApi();
        return pApp;
    }
}
