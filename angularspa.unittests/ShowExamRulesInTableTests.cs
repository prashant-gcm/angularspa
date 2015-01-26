using System;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using angularspaweb.Controllers;
using angularspaweb.Models;

namespace angularspa.unittests
{
    [TestClass]
    public class ShowExamRulesInTableTests
    {
        [TestMethod]
        public void GetJsonFromServer()
        {
            ExRulesDataController dataController = new ExRulesDataController();
            List<ExamRule> rules = dataController.Get("1", "exam", "data");

            Assert.IsNotNull(rules);
            Assert.IsTrue(rules.Count > 0);
        }

        [TestMethod]
        public void GetExamRules()
        {
            ExRulesDBContext exRulesFileContext = new ExRulesDBContext();
            List<ExamRule> rules = exRulesFileContext.GetExamRules("1");

            Assert.IsNotNull(rules);
            Assert.IsTrue(rules.Count > 0);
        }
    }
}
