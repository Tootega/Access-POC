using System;

using Microsoft.Extensions.DependencyInjection;

using STX.Access.Model;

namespace STX.Core.Model
{
    public abstract class XModule 
    {
        public virtual void Initialize(IServiceCollection pServices)
        {
        }
    }
}
