using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using angularspa.specs.TestHelpers;
using NUnit.Framework;
using OpenQA.Selenium;
using TechTalk.SpecFlow;

namespace angularspa.specs.SpecFlow.Steps.ShowExamRulesInTable
{
    [Binding]
    public class ShouldDisplayExamRulesInTabularFormat
    {
        [Then(@"the page should display Exam Rules in a tabular format")]
        public void ThenThePageShouldDisplayExamRulesInATabularFormat()
        {
            IWebDriver browserDriver = CommonHelpers.GetBrowserDriver();
            IWebElement element_grid = browserDriver.FindElement(By.ClassName("exruleeditor_grid"));
            IWebElement element_form = browserDriver.FindElement(By.ClassName("exruleeditor_form"));

            Assert.IsNotNull(element_grid);
            Assert.IsNotNull(element_form);
        }
    }
}
