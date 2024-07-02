using System;

namespace STX.Core.Model
{

    public class XServiceDataTuple : XDataTuple
    {

        public Boolean IsReadOnly
        {
            get; set;
        }

        public Boolean IsSelected
        {
            get; set;
        }

        public Boolean IsChecked
        {
            get; set;
        }
    }
}
