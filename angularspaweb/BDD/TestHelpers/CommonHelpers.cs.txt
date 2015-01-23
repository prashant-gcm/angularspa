using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using Selenium;

namespace angularspa.specs.TestHelpers
{
    class CommonHelpers
    {
        private const string USE_BROWSER = "Chrome";
        private const string APP_URL = "http://pacific/angularspa/exruleseditor/";
        private static IWebDriver _webDriver = null;
        private static string _LastNewlyAddedRuleName;
        private static string _DeletedRuleNames;

        public static IWebDriver GetBrowserDriver()
        {
            if (_webDriver != null) return _webDriver;

            switch (USE_BROWSER)
            {
                case "Chrome":
                    _webDriver = new ChromeDriver();
                    break;
                default:
                    _webDriver = new ChromeDriver();
                    break;
            }

            return _webDriver;
        }

        public static string GetAppUrl()
        {
            return APP_URL;
        }

        public static string SetLastNewlyAddedRuleName()
        {
            _LastNewlyAddedRuleName = "New Rule Name " + DateTime.Now.ToLongDateString() + " " + DateTime.Now.ToLongTimeString();
            return _LastNewlyAddedRuleName;
        }

        public static string GetLastNewlyAddedRuleName()
        {
            return _LastNewlyAddedRuleName;
        }

        public static string SetDeletedRuleNames(string deletedrulenames)
        {
            _DeletedRuleNames = deletedrulenames;
            return _DeletedRuleNames;
        }

        public static string GetDeletedRuleNames()
        {
            return _DeletedRuleNames;
        }
    }
}
