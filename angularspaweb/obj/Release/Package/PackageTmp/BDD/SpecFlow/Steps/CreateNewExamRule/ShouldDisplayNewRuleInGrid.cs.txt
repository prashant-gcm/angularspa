using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using angularspa.specs.TestHelpers;
using NUnit.Framework;
using OpenQA.Selenium;
using TechTalk.SpecFlow;

namespace angularspa.specs.SpecFlow.Steps.CreateNewExamRule
{
    [Binding]
    public class ShouldDisplayNewRuleInGrid
    {
        [Then(@"the result should be that the grid shows newly added rule")]
        public void ThenTheResultShouldBeThatTheGridShowsNewlyAddedRule()
        {
            IWebDriver browserDriver = CommonHelpers.GetBrowserDriver();
            IWebElement element_grid = browserDriver.FindElement(By.ClassName("exruleeditor_grid"));
            IReadOnlyCollection<IWebElement> grid_rows = element_grid.FindElements(By.TagName("tr"));
            IWebElement grid_row_tocheck = null;
            foreach (var grid_row in grid_rows)
            {
                IReadOnlyCollection<IWebElement> grid_columns = grid_row.FindElements(By.TagName("td"));
                bool bRuleFound = false;
                foreach (var grid_column in grid_columns)
                {
                    if (grid_column.Text == CommonHelpers.GetLastNewlyAddedRuleName())
                    {
                        bRuleFound = true;
                        break;
                    }
                }
                if (bRuleFound == true)
                {
                    grid_row_tocheck = grid_row;
                    break;
                }
            }

            Assert.IsNotNull(grid_row_tocheck);

            IWebElement[] grid_columns_tocheck = (IWebElement[])grid_row_tocheck.FindElements(By.TagName("td")).ToArray();
            Assert.AreEqual(grid_columns_tocheck[1].Text, CommonHelpers.GetLastNewlyAddedRuleName());
            Assert.AreEqual(grid_columns_tocheck[2].Text, "New Rule Description");
            Assert.AreEqual(grid_columns_tocheck[3].Text, "S3");
            Assert.AreEqual(grid_columns_tocheck[4].Text, "COMPLETE");
            Assert.AreEqual(grid_columns_tocheck[5].Text, "FAIL");
            Assert.AreEqual(grid_columns_tocheck[6].Text, "AND");
        }
    }
}
