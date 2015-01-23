using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using angularspa.specs.TestHelpers;
using NUnit.Framework;
using OpenQA.Selenium;
using TechTalk.SpecFlow;

namespace angularspa.specs.SpecFlow.Steps.DeleteExamRule
{
    [Binding]
    public class SelectedRulesShouldDisappear
    {
        [Then(@"the selected rules should disappear from the page")]
        public void ThenTheSelectedRulesShouldDisappearFromThePage()
        {
            IWebDriver browserDriver = CommonHelpers.GetBrowserDriver();
            IWebElement element_grid = browserDriver.FindElement(By.ClassName("exruleeditor_grid"));
            IReadOnlyCollection<IWebElement> grid_rows = element_grid.FindElements(By.TagName("tr"));
            string deleted_rule_names = CommonHelpers.GetDeletedRuleNames();
            bool bnot_deleted = false;
            foreach (var grid_row in grid_rows)
            {
                IWebElement[] grid_columns = (IWebElement[])grid_row.FindElements(By.TagName("td")).ToArray();
                if (grid_columns.Count() == 0) continue;

                string strrulename = grid_columns[1].Text;
                if (deleted_rule_names.IndexOf(strrulename + "}}") != -1)
                {
                    bnot_deleted = true;
                }
            }

            Assert.AreEqual(false, bnot_deleted, "Deleted rule did not disappear from page");
        }
    }
}
