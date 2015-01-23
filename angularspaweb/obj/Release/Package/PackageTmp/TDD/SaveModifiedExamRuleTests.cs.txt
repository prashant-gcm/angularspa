using System;
using System.Text;
using System.Collections.Generic;
using angularspaweb.Controllers;
using angularspaweb.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;

namespace angularspa.unittests
{
    [TestClass]
    public class SaveModifiedExamRuleTests
    {
        [TestMethod]
        public void PostJsonFromServer()
        {
            ExRulesDataController dataController = new ExRulesDataController();

            string data = "[" +
                          "{" +
                          "RuleId: '1', RuleName: 'Rule 1 from configuration 2', RuleDescription: 'Rule Description 1 from configuration 2', ExamCode: 'S3', Status: 'COMPLETE', Grade: 'PASS', Operator: 'AND'" +
                          "}" +
                          "]";

            dataController.Post("2", "exam", data);

            List<ExamRule> rules = dataController.Get("2", "exam", "data");
            Assert.AreEqual(rules[0].RuleId, 1);
            Assert.AreEqual(rules[0].RuleName, "Rule 1 from configuration 2");
            Assert.AreEqual(rules[0].RuleDescription, "Rule Description 1 from configuration 2");
            Assert.AreEqual(rules[0].ExamCode, "S3");
            Assert.AreEqual(rules[0].Status, "COMPLETE");
            Assert.AreEqual(rules[0].Grade, "PASS");
            Assert.AreEqual(rules[0].Operator, "AND");
        }

        [TestMethod]
        public void SaveExamRules()
        {
            ExRulesFileContext exRulesFileContext = new ExRulesFileContext();
            List<ExamRule> rules = exRulesFileContext.GetExamRules("1");

            bool bTestRuleFound = false;
            ExamRule test_rule = null;
            foreach (ExamRule rule in rules)
            {
                if (rule.RuleName == "Rule 2")
                {
                    test_rule = rule;
                    bTestRuleFound = true;
                }
            }

            Assert.AreEqual(bTestRuleFound, true);

            test_rule.RuleDescription = "Rule Description 2 - modified";
            exRulesFileContext.SaveExamRules("1", rules);

            rules = exRulesFileContext.GetExamRules("1");

            bTestRuleFound = false;
            test_rule = null;
            foreach (ExamRule rule in rules)
            {
                if (rule.RuleName == "Rule 2")
                {
                    test_rule = rule;
                    bTestRuleFound = true;
                }
            }

            Assert.AreEqual(bTestRuleFound, true);
            Assert.AreEqual(test_rule.RuleDescription, "Rule Description 2 - modified");
        }
    }
}
