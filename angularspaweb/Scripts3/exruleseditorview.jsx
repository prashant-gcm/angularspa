var ExRulesEditorView = React.createClass({
    onClickRuleName: function (ruleid) {
        window.RulesEditorActions.selectRule(ruleid);
    },

    onDeleteRules: function () {
        var ruleids = "";
        if (typeof this.ruleIdsToDelete === "undefined") return;
        if (this.ruleIdsToDelete.length == 0) return;
        this.ruleIdsToDelete.map(function (ruleid) {
            ruleids += (ruleids.length > 0 ? "," : "") + ruleid;
        });

        window.RulesEditorActions.deleteRules(ruleids);

        this.ruleIdsToDelete = [];
        $("input:checkbox[id^='chkboxRuleDelete_']").map(function (index, ctrl) {
            ctrl.checked = false;
        });
    },

    onCreateNewRule: function () {
        window.RulesEditorActions.fetchNewRule();
    },

    onRuleDeleteCheckboxSelect: function(event) {
        if (typeof this.ruleIdsToDelete === "undefined") {
            this.ruleIdsToDelete = [];
        }
        if (event.target.checked) {
            this.ruleIdsToDelete.push(event.target.value);
        } else {
            this.ruleIdsToDelete.map(function (ruleid, index, ruleIdsToDelete) {
                if (ruleid == event.target.value) delete ruleIdsToDelete[index];
            });
        }
    },

    render: function() {
        var ruleTableRows = [];

        for(var key in this.props.Rules)
        {
            var rule = this.props.Rules[key];
            ruleTableRows.push(
                    <tr>
                        <td width="5%" align="center"><input id="chkboxRuleDelete_{rule.RuleId}" type="checkbox" onChange={this.onRuleDeleteCheckboxSelect} value={rule.RuleId} /> </td>
                        <td width="10%"><a href="javascript:void(0)" onClick={this.onClickRuleName.bind(this, rule.RuleId)}>{rule.RuleName}</a></td>
                        <td width="15%">{rule.RuleDescription}</td>
                        <td width="10%">{rule.ExamCode}</td>
                        <td width="25%">{rule.Status}</td>
                        <td width="25%">{rule.Grade}</td>
                        <td width="10%" align="center">{rule.Operator}</td>
                    </tr>
            );
        }

        return (
            <div className="exruleeditor_grid">
                <h4>List of rules (Section: Exams)</h4>
                <table class="RuleTable">
                    <thead>
                        <tr>
                            <th width="5%" align="center">Delete</th>
                            <th width="10%">Rule Name</th>
                            <th width="15%">Rule Description</th>
                            <th width="10%">Exam</th>
                            <th width="25%">Status</th>
                            <th width="25%">Grade</th>
                            <th width="10%" align="center">And / Or</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ruleTableRows}
                    </tbody>
                </table>
                <br />
                <button id="btnDeleteRules" type="button" onClick={this.onDeleteRules}>Delete Selected Rules</button>
                <button id="btnCreateNewRule" type="button" onClick={this.onCreateNewRule}>Create New Rule</button>
                <br /><br />
            </div>
      );
    }
});
