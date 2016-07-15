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
    public class ExRulesData2Controller : ApiController
    {
        public void Post(string configurationid, string section, [FromBody] List<ExamRule> listdata)
        {
            ExRulesDBContext filecontext = new ExRulesDBContext();
            filecontext.SaveExamRules(configurationid, listdata);
        }
    }
}
