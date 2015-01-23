using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using angularspa.specs.TestHelpers;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using TechTalk.SpecFlow;

namespace angularspa.specs.SpecFlow.Steps.CreateNewExamRule
{
    [Binding]
    public class EnterNewExamRuleDetails
    {
        [When(@"I enter new exam rule details")]
        public void WhenIEnterNewExamRuleDetails()
        {
            IWebDriver browserDriver = CommonHelpers.GetBrowserDriver();

            IWebElement formInputElement = null;
            SelectElement selInputElement = null;

            formInputElement = browserDriver.FindElement(By.Id("txtRuleName"));
            formInputElement.Clear();
            formInputElement.SendKeys(CommonHelpers.SetLastNewlyAddedRuleName());

            formInputElement = browserDriver.FindElement(By.Id("txtRuleDescrption"));
            formInputElement.Clear();
            formInputElement.SendKeys("New Rule Description");

            selInputElement = new SelectElement(browserDriver.FindElement(By.Id("selectExamCode")));
            selInputElement.SelectByIndex(0);
            selInputElement.SelectByValue("S3");

            selInputElement = new SelectElement(browserDriver.FindElement(By.Id("selectStatus")));
            selInputElement.SelectByIndex(0);
            selInputElement.SelectByValue("COMPLETE");

            selInputElement = new SelectElement(browserDriver.FindElement(By.Id("selectGrade")));
            selInputElement.SelectByIndex(0);
            selInputElement.SelectByValue("FAIL");

            selInputElement = new SelectElement(browserDriver.FindElement(By.Id("selectOperator")));
            selInputElement.SelectByIndex(0);
            selInputElement.SelectByText("AND");

            System.Threading.Thread.Sleep(3000);
        }
    }
}
