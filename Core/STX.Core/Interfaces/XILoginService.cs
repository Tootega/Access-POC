using Microsoft.AspNetCore.Http;

using STX.Core.IDs.Model;

namespace STX.Core.Interfaces
{
    public interface XILoginService : XIService
    {
        XUserSession DoLogin(HttpContext pHttpContex, XUser pUser);
        (XUser User, XUserSession Session) GetUser(string pLogin);
    }
}
