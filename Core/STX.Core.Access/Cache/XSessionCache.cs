using System;
using System.Collections.Generic;

using STX.Access.Model;

namespace STX.Access.Cache
{
    public static class XSessionCache
    {
        public static XCacheUser Users;

        private static Dictionary<Guid, XLoginOk> _Cache = new Dictionary<Guid, XLoginOk>();
        private static Dictionary<string, XUser> _Users = new Dictionary<string, XUser>();

        public static int Count => _Cache.Count;

        public static XLoginOk AddSession(XLoginOk pLogin)
        {
            lock (_Cache)
                _Cache.TryAdd(pLogin.ID, pLogin);
            return pLogin;
        }

        public static void Wash()
        {
            lock (_Cache)
                _Cache.Clear();
        }

        public static XLoginOk GetUser(Guid pSessionID)
        {
            lock (_Cache)
            {
                _Cache.TryGetValue(pSessionID, out XLoginOk login);
                return login;
            }
        }

        public static void Invalidate(Guid pSessionID)
        {
            lock (_Cache)
                _Cache.Remove(pSessionID);
        }
    }
}
