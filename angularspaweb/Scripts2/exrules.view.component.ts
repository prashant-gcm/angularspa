import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Rule } from './Rule';
import { ExRulesService } from './exrules.service';

@Component({
    selector: 'exrules-view',
    templateUrl: '../Templates/exruleseditor/Editor2_Exam_View.html'
})
export class ExRulesViewComponent implements OnInit {
    Rules: Rule[];

    error: any;

    SelectedRule: Rule;

    @Output()
    ruleselected = new EventEmitter();

    RulesSelectedForDelete: Rule[];

    constructor(private exRulesService: ExRulesService) { }

    ngOnInit(): void {
        this.getRules();
        this.getNewRule();

        this.RulesSelectedForDelete = new Array<Rule>();
    }

    getRules(): Promise<Rule[]> {
        return this.exRulesService
            .fetchRules()
            .then(rules => this.Rules = rules)
            .catch(error => this.error = error);
    }

    private getNewRule(): void {
        this.SelectedRule = new Rule();
    }

    onClickRuleName(ruleid: Number): void {
        // alert("onClickRuleName called: " + ruleid);

        let selectedrule: Rule = this.Rules.find(rule => rule.RuleId === ruleid);

        let clonedRule: Rule = new Rule();
        this.copyRule(selectedrule, clonedRule);

        this.SelectedRule = clonedRule;

        this.ruleselected.emit(this.SelectedRule);
    }

    onSaveRule(rule: Rule): void {
        var vcurrentrule: Rule = this.getMatchingRule(rule.RuleId);
        if (vcurrentrule == null) {
            this.Rules.push(rule);
        } else {
            this.copyRule(rule, vcurrentrule);
        }

        Promise.resolve(
            this.exRulesService
                .saveExRuleChange(this.Rules)
                .then(this.afterSaveExRuleChange)
                .catch(error => this.error = error)
                .then(this.refreshRules));
    }

    onClickRuleDelete(ruleid: Number): void {
        // alert("onClickRuleDelete called");

        let vcheckedrule: Rule = this.getMatchingRule(ruleid);

        let ventry: Rule = this.RulesSelectedForDelete.find(rule => rule.RuleId === ruleid);

        if (ventry == null) {
            this.RulesSelectedForDelete.push(vcheckedrule);
        } else {
            this.RulesSelectedForDelete = this.RulesSelectedForDelete.filter(rule => rule.RuleId !== ruleid);
        }
    }

    onDeleteRules(): void {
        // alert("onDeleteRules called:");
        let vruleids: string = "";

        for (let rule of this.RulesSelectedForDelete) {
            vruleids += ((vruleids.length !== 0) ? "," : "") + rule.RuleId;
        }

        Promise.resolve(
            this.exRulesService
                .deleteRules(vruleids)
                .then(this.afterDeleteRules)
                .catch(error => this.error = error)
                .then(this.refreshRules));
    };

    onCreateNewRule(): void {
        // alert("onCreateNewRule called");

        this.getNewRule();

        this.ruleselected.emit(this.SelectedRule);
    };

    private refreshRules(): Promise<Rule[]> {
        // alert("refreshRules called");
        return this.getRules();
    }

    private copyRule(fromRule: Rule, toRule: Rule): void {
        toRule.RuleId = fromRule.RuleId;
        toRule.RuleName = fromRule.RuleName;
        toRule.RuleDescription = fromRule.RuleDescription;
        toRule.ExamCode = fromRule.ExamCode;
        toRule.Status = fromRule.Status;
        toRule.Operator = fromRule.Operator;
    }

    private getMatchingRule(ruleid: Number): Rule {
        let matchedRule: Rule = null;
        for (let rule of this.Rules) {
            if (rule.RuleId === ruleid) {
                matchedRule = rule;
                break;
            }
        }
        return matchedRule;
    }

    private afterSaveExRuleChange(res: boolean): boolean {
        // res ? alert("Rule is saved") : null;
        return res;
    }

    private afterDeleteRules(res: boolean): boolean {
        // res ? alert("Selected Rule(s) are deleted") : null;
        return res;
    }
}
