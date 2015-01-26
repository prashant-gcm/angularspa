using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace angularspaweb.Models
{
    public class ExRulesFileContext : FileDBContext
    {
        public FileDBSet<Configuration> Configurations { get; set; }
        public FileDBSet<ExamRule> ExamRules { get; set; }

        public ExRulesFileContext()
        {
            Configurations = new FileDBSet<Configuration>();
            ExamRules = new FileDBSet<ExamRule>();
        }

        public List<ExamRule> GetExamRules(string dataid)
        {
            return Select(ExamRules, dataid);
        }

        public void SaveExamRules(string dataid, List<ExamRule> data)
        {
            Update(ExamRules, dataid, data);
        }

        public List<ExamRule> GetEmptyExamRule(string section)
        {
            List<ExamRule> emptyrules = new List<ExamRule>();
            ExamRule emptyrule = new ExamRule();
            emptyrule.RuleId = 0;
            emptyrule.Operator = "AND";
            emptyrules.Add(emptyrule);
            return emptyrules;
        }
    }
}