using System.ComponentModel.DataAnnotations.Schema;

namespace STX.Core.Model
{
    public enum XTupleState
    {
        Detached = 0,
        Unchanged = 1,
        Deleted = 2,
        Modified = 3,
        Added = 4,
        Insert = 5
    }

    public enum XFieldState
    {
        Empty = 0,
        Unchanged = 1,
        NotEmpty = 2,
        Modified = 3,
    }

    public class XDataTuple
    {
        [NotMapped]
        public XTupleState State
        {
            get; set;
        }
    }
}
