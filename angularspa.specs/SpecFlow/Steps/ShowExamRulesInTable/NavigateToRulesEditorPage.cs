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
    public class NavigateToRulesEditorPage
    {
        [When(@"I navigate to default page of the application")]
        public void WhenINavigateToDefaultPageOfTheApplication()
        {
            IWebDriver browserDriver = CommonHelpers.GetBrowserDriver();
            browserDriver.Navigate().GoToUrl(CommonHelpers.GetAppUrl());
        }
    }
}
