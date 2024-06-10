using System;

namespace STX.Access
{
    public static class XTAFDefault
    {
        static XTAFDefault()
        {
            AuthenticationSchemes = Guid.NewGuid().ToString();
        }
        public static string AuthenticationSchemes;

        public static string Unauthorized()
        {
            return "Acesso não autorizado";
        }
    }
}
