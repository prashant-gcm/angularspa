var ExRulesEditorForm = React.createClass({
    onSaveExRuleChange: function(){
        window.RulesEditorActions.saveRule(this.props.CurrentRule);
        return false;
    },

    onChange: function (event) {
        switch (event.target.id) {
            case "txtRuleName":
                this.props.CurrentRule.RuleName = event.target.value;
                break;
            case "txtRuleDescrption":
                this.props.CurrentRule.RuleDescription = event.target.value;
                break;
            case "selectExamCode":
                this.props.CurrentRule.ExamCode = event.target.value;
                break;
            case "selectStatus":
                this.props.CurrentRule.Status = event.target.value;
                break;
            case "selectGrade":
                this.props.CurrentRule.Grade = event.target.value;
                break;
            case "selectOperator":
                this.props.CurrentRule.Operator = event.target.value;
                break;
        }

        this.props.onChange(this.props.CurrentRule);
    },

    render: function () {
        return (
            <div className="exruleeditor_form">
                <form id="formexrules" name="formexrules" onSubmit={this.onSaveExRuleChange}>
                    <fieldset>
                        <legend>Rule Details</legend>
                        <label>Rule Id</label>
                        <span>{this.props.CurrentRule.RuleId}</span><br />
                        <label>Rule Name</label>
                        <input type="text" id="txtRuleName" value={this.props.CurrentRule.RuleName} onChange={this.onChange} /><br />
                        <label>Rule Description</label>
                        <input type="text" id="txtRuleDescrption" value={this.props.CurrentRule.RuleDescription} onChange={this.onChange} /><br />
                        <label>Exam</label>
                        <select id="selectExamCode" value={this.props.CurrentRule.ExamCode} onChange={this.onChange}>
                            <option value=""></option>
                            <option value="S10">S10</option>
                            <option value="S3">S3</option>
                            <option value="S6">S6</option>
                            <option value="S4">S4</option>
                            <option value="S12">S12</option>
                        </select>
                        <br />
                        <label>Status</label>
                        <select id="selectStatus" value={this.props.CurrentRule.Status} onChange={this.onChange}>
                            <option value=""></option>
                            <option value="COMPLETE">COMPLETE</option>
                            <option value="REQUESTED">REQUESTED</option>
                            <option value="DEFERRED">DEFERRED</option>
                            <option value="SCHEDULED">SCHEDULED</option>
                            <option value="EXPIRED">EXPIRED</option>
                        </select>
                        <br />
                        <label>Grade</label>
                        <select id="selectGrade" value={this.props.CurrentRule.Grade} onChange={this.onChange}>
                            <option value=""></option>
                            <option value="PASS">PASS</option>
                            <option value="FAIL">FAIL</option>
                        </select>
                        <br />
                        <label>Operator</label>
                        <select id="selectOperator" value={this.props.CurrentRule.Operator} onChange={this.onChange}>
                            <option value="AND">AND</option>
                            <option value="OR">OR</option>
                        </select>
                        <br /><br />
                        <button id="btnRuleSubmit" type="button" onClick={this.onSaveExRuleChange}>Submit</button>
                    </fieldset>
                </form>
            </div>
      );
    }
});
