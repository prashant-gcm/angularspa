using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using angularspa.specs.TestHelpers;
using OpenQA.Selenium;
using TechTalk.SpecFlow;

namespace angularspa.specs.SpecFlow.Steps.ShowExamRulesInTable
{
    [Binding]
    public class OpenBrowserWindow
    {
        [Given(@"I have opened browser window")]
        public void GivenIHaveOpenedBrowserWindow()
        {
            IWebDriver browserDriver = CommonHelpers.GetBrowserDriver();
        }
    }
}
