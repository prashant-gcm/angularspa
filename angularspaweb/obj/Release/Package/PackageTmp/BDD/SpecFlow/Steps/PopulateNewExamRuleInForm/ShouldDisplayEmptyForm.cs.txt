using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using angularspa.specs.TestHelpers;
using NUnit.Framework;
using OpenQA.Selenium;
using TechTalk.SpecFlow;
using System.Text.RegularExpressions;

namespace angularspa.specs.SpecFlow.Steps.PopulateNewExamRuleInForm
{
    [Binding]
    public class ShouldDisplayEmptyForm
    {
        [Then(@"the form should be empty and rule id should display as (.*)")]
        public void ThenTheFormShouldBeEmptyAndRuleIdShouldDisplayAs(int p0)
        {
            IWebDriver browserDriver = CommonHelpers.GetBrowserDriver();

            IWebElement div_exruleeditor_form = browserDriver.FindElement(By.ClassName("exruleeditor_form"));
            string div_exruleeditor_form_text = div_exruleeditor_form.Text;
            bool bRuleId_0_found = false;
            bRuleId_0_found = (div_exruleeditor_form_text.IndexOf("0") != -1);
            Assert.AreEqual(true, bRuleId_0_found);
        }
    }
}
