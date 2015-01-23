using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using angularspa.specs.TestHelpers;
using NUnit.Framework;
using OpenQA.Selenium;
using TechTalk.SpecFlow;

namespace angularspa.specs.SpecFlow.Steps.PopuateExamRuleInForm
{
    [Binding]
    public class ClickOnAExamRuleName
    {
        [When(@"I click on a exam rule name")]
        public void WhenIPressClickOnAExamRuleName()
        {
            IWebDriver browserDriver = CommonHelpers.GetBrowserDriver();
            string rulename = "Rule 1";
            IWebElement rulenameElement = browserDriver.FindElement(By.LinkText(rulename));

            rulenameElement.Click();

            System.Threading.Thread.Sleep(3000);
        }
    }
}
