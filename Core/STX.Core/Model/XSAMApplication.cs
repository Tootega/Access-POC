using System;

namespace STX.Core.Model
{
    public abstract class XSAMApplication
    {
        public string Title
        {
            get;
            set;
        }
        public string Module
        {
            get;
            set;
        }
        public string Icon
        {
            get;
            set;
        }
        public Guid MenuID
        {
            get;
            set;
        }
        public int Ordem
        {
            get;
            set;
        }
    }
}
