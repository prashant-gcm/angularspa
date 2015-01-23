using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;

namespace angularspaweb.Models
{
    [Serializable]
    public class ExamRule
    {
        public long RuleId;
        public string RuleName;
        public string RuleDescription;
        public string ExamCode;
        public string Status;
        public string Grade;
        public string Operator;

        //public virtual Configuration Configuration { get; set; }
    }
}

/*$scope.Rules = [
        {
            RuleId: 1,
            RuleName: "Rule 1",
            RuleDescription: "Rule Description 1",
            ExamCode: "S10",
            Status: "COMPLETE",
            Grade: "PASS",
            Operator:"AND"
        },
        {
            RuleId: 2,
            RuleName: "Rule 2",
            RuleDescription: "Rule Description 2",
            ExamCode: "S3",
            Status: "REQUESTED",
            Grade: "",
            Operator: "AND"
        },
        {
            RuleId: 3,
            RuleName: "Rule 3",
            RuleDescription: "Rule Description 3",
            ExamCode: "S6",
            Status: "DEFERRED",
            Grade: "",
            Operator: "AND"
        },
        {
            RuleId: 4,
            RuleName: "Rule 4",
            RuleDescription: "Rule Description 4",
            ExamCode: "S4",
            Status: "COMPLETE",
            Grade: "FAIL",
            Operator: "AND"
        },
        {
            RuleId: 5,
            RuleName: "Rule 5",
            RuleDescription: "Rule Description 5",
            ExamCode: "S12",
            Status: "SCHEDULED",
            Grade: "",
            Operator: "AND"
        }
    ];*/