using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using angularspa.specs.TestHelpers;
using OpenQA.Selenium;
using TechTalk.SpecFlow;

namespace angularspa.specs.SpecFlow.Steps.ModifyExamRuleAndSave
{
    [Binding]
    public class ClickOnSubmitButton
    {
        [When(@"I click on Submit button")]
        public void WhenIClickOnSubmitButton()
        {
            IWebDriver browserDriver = CommonHelpers.GetBrowserDriver();
            IWebElement formSubmitButtonElement = browserDriver.FindElement(By.Id("btnRuleSubmit"));
            formSubmitButtonElement.Click();

            System.Threading.Thread.Sleep(3000);
        }
    }
}
