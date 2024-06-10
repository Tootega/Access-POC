using System;

namespace TFX.Access.Model
{
    public record XLoginOk
    {
        public Guid ID { get; set; }
        public Guid UserID { get; set; }
        public long RAM { get; set; }
    }
}
