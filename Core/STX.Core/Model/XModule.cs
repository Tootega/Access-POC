using Microsoft.Extensions.DependencyInjection;

namespace STX.Core.Model
{
    public abstract class XModule
    {
        public virtual void Initialize(IServiceCollection pServices)
        {
        }
    }
}
