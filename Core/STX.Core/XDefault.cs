using System;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Threading;

namespace STX.Core
{
    public static class XDefault
    {
        static XDefault()
        {
            MainThread = Thread.CurrentThread.ManagedThreadId;
            String loc = typeof(XDefault).Assembly.Location;
            FileVersionInfo fvi = FileVersionInfo.GetVersionInfo(loc);
            InitializePath(Path.GetDirectoryName(loc));
            AuthenticationSchemes = Guid.NewGuid().ToString();
        }
        public static string AuthenticationSchemes;

        public static string Unauthorized()
        {
            return "Acesso não autorizado";
        }

        public const String FullDateTimeFormat = "yyyy-MM-dd HH:mm:ss.FFFFFFF";
        public static DateTime NullDateTime = new DateTime(1753, 1, 1, 0, 0, 0, 1);
        public static Boolean ForceDebugTime = false;
#if (DEBUG)
        public static Boolean IsDebug = true;
#else
        public static Boolean IsDebug = false;
#endif

        public static Boolean IsDebugTime
        {
            get
            {
                return Debugger.IsAttached || ForceDebugTime;
            }
        }
        private static void InitializePath(String pAppPath)
        {
            AppPath = pAppPath;
        }

        public static Int32 MainThread
        {
            get;
        }

        public static String AppPath
        {
            get;
            private set;
        }

        public static string PluginFolder
        {
            get;
            internal set;
        }

        public static DateTime Now
        {
            get
            {
                String str = DateTime.Now.ToString(FullDateTimeFormat);
                return DateTime.ParseExact(str, FullDateTimeFormat, CultureInfo.InvariantCulture);
            }
        }
    }
}
