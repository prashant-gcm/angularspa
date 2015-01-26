using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using angularspaweb.Models;
using Newtonsoft.Json;

namespace angularspaweb.Controllers
{
    public class ExRulesDataController : ApiController
    {
        public List<ExamRule> Get(string configurationid, string section, string empty)
        {
            ExRulesDBContext filecontext = new ExRulesDBContext();

            if (empty != "empty")
            {
                List<ExamRule> examrules = filecontext.GetExamRules(configurationid);
                return examrules;
            }
            else
            {
                return filecontext.GetEmptyExamRule(section);
            }
        }

        public void Post(string configurationid, string section, [FromBody] string data)
        {
            if (data.IndexOf("deleteruleids") == -1)
            {
                ExRulesDBContext filecontext = new ExRulesDBContext();
                List<ExamRule> listdata = JsonConvert.DeserializeObject<List<ExamRule>>(data);
                filecontext.SaveExamRules(configurationid, listdata);
            }
            else
            {
                string ruleids = data.Replace("\"", "").Replace("deleteruleids:", "").Replace("{", "").Replace("}", "").Trim();
                Delete(configurationid, section, ruleids);
            }
        }

        public void Delete(string configurationid, string section, string ruleids)
        {
            ExRulesDBContext filecontext = new ExRulesDBContext();
            List<ExamRule> examrules = filecontext.GetExamRules(configurationid);
            List<ExamRule> newexamrules = new List<ExamRule>();
            foreach (ExamRule rule in examrules)
            {
                if (("," + ruleids + ",").IndexOf("," + rule.RuleId + ",") == -1)
                {
                    newexamrules.Add(rule);
                }
            }
            filecontext.SaveExamRules(configurationid, newexamrules);
        }
    }
}
