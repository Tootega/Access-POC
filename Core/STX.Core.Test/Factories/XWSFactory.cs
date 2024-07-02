using System;

using STX.Core.Test.Interfaces;

using STX.Core.Test.PlayWright;


namespace STX.Core.Test.Factories
{
    public enum XSCDriver
    {
        PalyWright = 1,
    }

    public static class XWSFactory
    {
        public static XIWSBrowser CreateBrowser(XSCDriver pDriver, XSCBrowserConfig pConfig)
        {
            if (pConfig == null)
                throw new ArgumentNullException(nameof(pConfig));
            //if (!pConfig.UserProfile.IsFilled())
            //    throw new ArgumentNullException(nameof(pConfig.UserProfile));
            //if (!pConfig.GroupProfile.IsFilled())
            //    throw new ArgumentNullException(nameof(pConfig.GroupProfile));
            switch (pDriver)
            {
                case XSCDriver.PalyWright:
                {
                    var instance = new XPlayWrightBrowser();
                    instance.Initialize(pConfig);
                    instance.StartAsync().Wait();
                    return instance;
                }
            }
            throw new Exception($"Browser [{pDriver}] não implementado.");
        }
    }
}
