using System;

namespace STX.Access.Model
{
    public record XUser
    {
        public Guid ID { get; set; }
        public string Login { get; set; }
    }
}
