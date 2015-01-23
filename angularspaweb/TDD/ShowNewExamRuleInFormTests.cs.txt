using System;
using System.Collections.Generic;
using angularspaweb.Controllers;
using angularspaweb.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace angularspa.unittests
{
    [TestClass]
    public class ShowNewExamRuleInFormTests
    {
        [TestMethod]
        public void GetJsonFromServer()
        {
            ExRulesDataController dataController = new ExRulesDataController();
            List<ExamRule> rules = dataController.Get("1", "exam", "empty");

            Assert.IsNotNull(rules);
            Assert.IsTrue(rules.Count > 0);
            Assert.IsTrue(rules[0].RuleId == 0);
        }
    }
}
