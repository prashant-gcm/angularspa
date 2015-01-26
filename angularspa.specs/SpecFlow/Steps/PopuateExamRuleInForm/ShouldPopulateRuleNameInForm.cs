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
    public class ShouldPopulateRuleNameInForm
    {
        [Then(@"the selected exam rule should populate in the form")]
        public void ThenTheSelectedExamRuleShouldPopulateInTheForm()
        {
            IWebDriver browserDriver = CommonHelpers.GetBrowserDriver();

            IWebElement formInputElement = browserDriver.FindElement(By.Id("txtRuleName"));
            string inputtext = formInputElement.GetAttribute("value");

            Assert.AreEqual("Rule 2", inputtext);
        }
    }
}
