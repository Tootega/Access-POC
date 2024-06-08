using System.Text;

using TFX.Access.Cache;
using TFX.Access.Model;

namespace StressTest
{
    internal class Program
    {
        static void Main(string[] args)
        {
            LoginParallel();
            Console.ReadLine();
        }

        static int _Count;
        static int _Error;
        static long _Start;
        private static XUser[] _Data;

        public static void LoginParallel()
        {
            //_Setup.Open();
            _Start = DateTime.Now.Ticks;
            var data = File.ReadAllLines(@"D:\Tootega\Source\Access-POC\Tests\Assets\Users.csv");
            var users = new Dictionary<string, XUser>();
            for (int i = 0; i < 1_000_000; i++)
                users.Add(data[i], new XUser { ID = Guid.NewGuid(), Login = data[i] });
            _Data = users.Values.ToArray();
            XSessionCache.Users = new XCacheUser();
            XSessionCache.Users.Swap(users);
            //Do(0);

            for (int i = 0; i < 30; i++)
                ThreadPool.QueueUserWorkItem((a) => Do(0));
            ThreadPool.QueueUserWorkItem((a) => Statistic());
        }

        private static void Statistic()
        {
            while (true)
            {
                var et = new TimeSpan(DateTime.Now.Ticks - _Start);
                if (et.Seconds > 0)
                    Console.WriteLine($"Count {_Count.ToString("#,##0")} Login/s {(_Count / et.TotalSeconds).ToString("#,##0")} Errors {_Error.ToString("#,##0")} ");
                Thread.Sleep(5000);
            }
        }

        private static void Do(int i)
        {
            using HttpClient client = new HttpClient();
            for (int j = 0; j < 1000000; j++)
            {
                try
                {

                    using var st = new StringContent("{ \"Login\": \"" + _Data[i].Login + "\" }", Encoding.UTF8, "application/json");
                    using HttpResponseMessage response = client.PostAsync("http://localhost:5000/Access/Login", st).Result;
                    response.EnsureSuccessStatusCode();
                    //if (response.StatusCode == HttpStatusCode.OK)
                    //{
                    //}
                    _Count++;
                }
                catch (Exception e)
                {
                    _Error++;
                    //Console.WriteLine("\nException Caught!");
                    //Console.WriteLine("Message :{0} ", e.Message);

                }
            }
        }
    }
}
