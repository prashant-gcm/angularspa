using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using angularspa.specs.TestHelpers;
using OpenQA.Selenium;
using TechTalk.SpecFlow;

namespace angularspa.specs.SpecFlow.Steps.PopulateNewExamRuleInForm
{
    [Binding]
    public class ClickOnCreateNewRuleButton
    {
        [When(@"I click on Create New Rule button")]
        public void WhenIClickOnCreateNewRuleButton()
        {
            IWebDriver browserDriver = CommonHelpers.GetBrowserDriver();
            IWebElement formCreateNewRuleButtonElement = browserDriver.FindElement(By.Id("btnCreateNewRule"));
            formCreateNewRuleButtonElement.Click();

            System.Threading.Thread.Sleep(3000);
        }
    }
}
