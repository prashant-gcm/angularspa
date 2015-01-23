using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace angularspaweb.Models
{
    [Serializable]
    public class Configuration
    {
        public long ConfigurationId { get; set; }
        public string ConfigurationName { get; set; }

        public virtual ICollection<ExamRule> ExamRules { get; set; }
    }
}