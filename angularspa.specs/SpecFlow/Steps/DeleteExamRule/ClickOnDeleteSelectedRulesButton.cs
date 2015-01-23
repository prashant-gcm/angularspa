using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using angularspa.specs.TestHelpers;
using OpenQA.Selenium;
using TechTalk.SpecFlow;

namespace angularspa.specs.SpecFlow.Steps.DeleteExamRule
{
    [Binding]
    public class ClickOnDeleteSelectedRulesButton
    {
        [When(@"I click on Delete Selected Rules button")]
        public void WhenIClickOnDeleteSelectedRulesButton()
        {
            IWebDriver browserDriver = CommonHelpers.GetBrowserDriver();
            IWebElement deleteSelectedRulesButtonElement = browserDriver.FindElement(By.Id("btnDeleteRules"));
            deleteSelectedRulesButtonElement.Click();

            System.Threading.Thread.Sleep(3000);
        }
    }
}
