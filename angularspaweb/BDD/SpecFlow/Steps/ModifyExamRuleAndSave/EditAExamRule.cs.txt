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
    public class EditAExamRule
    {
        [When(@"I edit rule name")]
        public void WhenIEditRuleName()
        {
            IWebDriver browserDriver = CommonHelpers.GetBrowserDriver();

            IWebElement formInputElement = browserDriver.FindElement(By.Id("txtRuleDescrption"));
            formInputElement.Clear();
            formInputElement.SendKeys("Rule Description 3 - modified");
        }
    }
}
