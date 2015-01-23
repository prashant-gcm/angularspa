using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using angularspa.specs.TestHelpers;
using OpenQA.Selenium;
using TechTalk.SpecFlow;

namespace angularspa.specs.SpecFlow.Steps.PopuateExamRuleInForm
{
    [Binding]
    public class OpenExamRuleEditorPage
    {
        [Given(@"I have opened exam rule editor page")]
        public void GivenIHaveOpenedExamRuleEditorPage()
        {
            IWebDriver browserDriver = CommonHelpers.GetBrowserDriver();
            browserDriver.Navigate().GoToUrl(CommonHelpers.GetAppUrl());
            System.Threading.Thread.Sleep(3000);
        }
    }
}
