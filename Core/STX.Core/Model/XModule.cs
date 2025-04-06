using Microsoft.Extensions.DependencyInjection;

namespace TFX.Core.Model
{
    public abstract class XModule
    {
        public virtual void Initialize(IServiceCollection pServices)
        {
        }
    }
}
