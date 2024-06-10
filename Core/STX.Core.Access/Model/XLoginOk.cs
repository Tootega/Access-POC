using System;

namespace STX.Access.Model
{
    public record XLoginOk
    {
        public Guid ID { get; set; }
        public Guid UserID { get; set; }
        public long RAM { get; set; }
    }
}
