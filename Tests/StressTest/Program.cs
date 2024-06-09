using System.Text;
using System.Text.Json;

using TFX.Access.Cache;
using TFX.Access.Model;

namespace StressTest
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("EXECUTANDO");
            LoginParallel();
            Console.WriteLine("Stress Finalizado");
            Console.ReadLine();
        }

        static int _Count;
        static int _Error;
        static long _Start;
        private static XUser[] _Data;
        static int _Running = 0;
        private static bool _Wait = true;
        private static long _RAM;

        public static void LoginParallel()
        {
            _Start = DateTime.Now.Ticks;
            Console.WriteLine("Carreganddo Usuários");
            var data = File.ReadAllLines(@"D:\Tootega\Source\Access-POC\Tests\Assets\Users.csv");
            var users = new Dictionary<string, XUser>();
            for (int i = 0; i < 1_000_000; i++)
                users.Add(data[i], new XUser { ID = Guid.NewGuid(), Login = data[i] });
            _Data = users.Values.ToArray();
            Console.WriteLine($"{users.Count.ToString("#,##0")} de Usuários Carregados");
            XSessionCache.Users = new XCacheUser();
            XSessionCache.Users.Swap(users);
            //Do(0);

            for (int i = 0; i < 90; i++)
            {
                _Running++;
                ThreadPool.QueueUserWorkItem((a) => Do(0));
            }
            Console.WriteLine($"Inciando Stress {DateTime.Now}");
            Statistic();
        }

        private static void Statistic()
        {
            while (_Wait)
            {
                var et = new TimeSpan(DateTime.Now.Ticks - _Start);

                if (et.Seconds > 0)
                    Console.WriteLine($"Count {_Count.ToString("#,##0")} Login/s {(_Count / et.TotalSeconds).ToString("#,##0")} RAM Use {_RAM.ToString("#,##0")}GB Errors {_Error.ToString("#,##0")} ");
                Thread.Sleep(5000);
                if (_Running == 0)
                {
                    Console.WriteLine($"Finalizado {DateTime.Now} Doração {et}");
                    _Wait = false;
                }
            }
        }

        private static void Do(int i)
        {
            try
            {
                using HttpClient client = new HttpClient();
                for (int j = 0; j < 1000000; j++)
                {
                    try
                    {

                        using var st = new StringContent("{ \"Login\": \"" + _Data[i].Login + "\" }", Encoding.UTF8, "application/json");
                        using HttpResponseMessage response = client.PostAsync("http://192.168.1.7:5000/Access/Login", st).Result;
                        response.EnsureSuccessStatusCode();
                        var data = response.Content.ReadAsStringAsync().Result;
                        XLoginOk res = JsonSerializer.Deserialize<XLoginOk>(data);
                        if (res == null)
                            _Error++;
                        else
                        {
                            _RAM = res.RAM;
                            _Count++;
                        }
                    }
                    catch
                    {
                        _Error++;
                    }
                }
            }
            finally
            {
                _Running--;
            }
        }
    }
}
