export class Rule {
    public RuleId: Number;
    public RuleName: String;
    public RuleDescription: String;
    public ExamCode: String;
    public Status: String;
    public Operator: String;

    constructor() {
        this.RuleId = 0;
        this.RuleName = "";
        this.RuleDescription = "";
        this.ExamCode = "";
        this.Status = "";
        this.Operator = "";
    }
}