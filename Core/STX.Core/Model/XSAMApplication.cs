using System;

namespace STX.Core.Model
{
    public abstract class XSAMApplication
    {
        public String Title
        {
            get;
            set;
        }
        public String Module
        {
            get;
            set;
        }
        public String Icon
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
