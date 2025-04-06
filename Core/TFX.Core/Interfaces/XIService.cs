using System;

namespace TFX.Core.Interfaces
{
	public interface XIService 
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
