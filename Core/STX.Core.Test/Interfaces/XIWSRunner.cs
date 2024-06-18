
using System;
using System.Threading.Tasks;

namespace STX.Core.Test.Interfaces
{

    public interface XIWSRunner
    {
        Task Execute();
        Boolean IsBusy
        {
            get;
        }

        String StartURL
        {
            get;
            set;
        }
    }
}
