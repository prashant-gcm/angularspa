using System;
using System.Linq;
using System.Collections.Generic;
using System.Security.AccessControl;
using angularspaweb.Controllers;
using angularspaweb.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace angularspa.unittests
{
    [TestClass]
    public class DeleteExamRulesTests
    {
        [TestMethod]
        public void PostJsonFromServer()
        {
            ExRulesDataController dataController = new ExRulesDataController();

            //Delete 3rd and 5th rule - while saving theie RuleId for reference later
            string ruleid_arrayelements_to_delete = ",3,5,";
            int row_number = 0;
            string ruleids_to_delete = "";
            List<ExamRule> rules = null;

            rules = dataController.Get("1", "exam", "data");
            foreach (var rule in rules)
            {
                if (ruleid_arrayelements_to_delete.IndexOf("," + Convert.ToString(row_number) + ",") != -1)
                {
                    ruleids_to_delete += (ruleids_to_delete.Length > 0 ? "," : "") + rule.RuleId;
                }
                row_number++;
            }

            Assert.AreEqual(true, ruleids_to_delete.Length > 0, "No rules selected for deletion");

            //Delete the rules
            dataController.Delete("1", "exam", ruleids_to_delete);

            //Get rules from repository and Verify that the rules were deleted
            rules = dataController.Get("1", "exam", "data");
            bool bselected_rule_not_deleted = false;
            foreach (string ruleid in ruleids_to_delete.Split(','))
            {
                int aruleid = Convert.ToInt32(ruleid);
                if (rules.Where(r => r.RuleId == aruleid).Count() > 0)
                {
                    bselected_rule_not_deleted = true;
                    break;
                }
            }

            Assert.AreEqual(false, bselected_rule_not_deleted, "Selected rule was not deleted");
        }
    }
}
