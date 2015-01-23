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
    public class SelectAExamRuleToChange
    {
        [Given(@"I have clicked on a rule name to select the rule to change")]
        public void GivenIHaveClickedOnARuleNameToSelectTheRuleToChange()
        {
            IWebDriver browserDriver = CommonHelpers.GetBrowserDriver();
            string rulename = "Rule 3";
            IWebElement rulenameElement = browserDriver.FindElement(By.LinkText(rulename));

            rulenameElement.Click();

            System.Threading.Thread.Sleep(3000);
        }
    }
}
