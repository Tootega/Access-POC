using Microsoft.AspNetCore.Server.Kestrel.Core;

using TFX.Access;
using TFX.Access.Cache;
using TFX.Access.Model;

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

            App.Run();
        }

        private static void Initialize()
        {
            XSessionCache.Users = new XCacheUser();
            var data = File.ReadAllLines(@"D:\Tootega\Source\Access-POC\Tests\Assets\Users.csv");
            var users = new Dictionary<string, XUser>();
            for (int i = 0; i < 1_000_000; i++)
                users.Add(data[i], new XUser { ID = Guid.NewGuid(), Login = data[i] });
            XSessionCache.Users.Swap(users);
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
