using System;

namespace STX.Core.Interfaces
{
	public interface XIService : IDisposable
	{
		Guid ID
		{
			get;
		}
		string Name
		{
			get;
		}
	}

	public interface XIJobService : XIService
	{
	}

	public interface XIJobRabbitMQService : XIJobService 
	{
	}
}
