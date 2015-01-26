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
    public class SelectDeleteCheckboxes
    {
        [When(@"I check delete checkboxes for the rules that are to be delteted")]
        public void WhenICheckDeleteCheckboxesForTheRulesThatAreToBeDelteted()
        {
            IWebDriver browserDriver = CommonHelpers.GetBrowserDriver();
            IWebElement element_grid = browserDriver.FindElement(By.ClassName("exruleeditor_grid"));
            IReadOnlyCollection<IWebElement> grid_rows = element_grid.FindElements(By.TagName("tr"));
            string rownumbers_to_delete = ",6,7,";
            int row_number = 0;
            bool bcheckbox_selected = false;
            StringBuilder deleted_rule_names = new StringBuilder("");
            foreach (var grid_row in grid_rows)
            {
                if (rownumbers_to_delete.IndexOf(Convert.ToString("," + row_number + ",")) != -1)
                {
                    IWebElement delete_checkbox = grid_row.FindElement(By.TagName("Input"));
                    delete_checkbox.Click();
                    bcheckbox_selected = true;

                    IWebElement[] grid_columns = (IWebElement[])grid_row.FindElements(By.TagName("td")).ToArray();
                    string strrulename = grid_columns[1].Text;
                    deleted_rule_names.Append(strrulename + "}}");
                }
                row_number++;
            }

            CommonHelpers.SetDeletedRuleNames(deleted_rule_names.ToString());

            Assert.AreEqual(true, bcheckbox_selected, "No delete checkbox has been selected");
        }
    }
}
