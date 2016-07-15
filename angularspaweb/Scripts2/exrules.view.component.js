"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Rule_1 = require('./Rule');
var exrules_service_1 = require('./exrules.service');
var ExRulesViewComponent = (function () {
    function ExRulesViewComponent(exRulesService) {
        this.exRulesService = exRulesService;
        this.ruleselected = new core_1.EventEmitter();
    }
    ExRulesViewComponent.prototype.ngOnInit = function () {
        this.getRules();
        this.getNewRule();
        this.RulesSelectedForDelete = new Array();
    };
    ExRulesViewComponent.prototype.getRules = function () {
        var _this = this;
        return this.exRulesService
            .fetchRules()
            .then(function (rules) { return _this.Rules = rules; })
            .catch(function (error) { return _this.error = error; });
    };
    ExRulesViewComponent.prototype.getNewRule = function () {
        this.SelectedRule = new Rule_1.Rule();
    };
    ExRulesViewComponent.prototype.onClickRuleName = function (ruleid) {
        // alert("onClickRuleName called: " + ruleid);
        var selectedrule = this.Rules.find(function (rule) { return rule.RuleId === ruleid; });
        var clonedRule = new Rule_1.Rule();
        this.copyRule(selectedrule, clonedRule);
        this.SelectedRule = clonedRule;
        this.ruleselected.emit(this.SelectedRule);
    };
    ExRulesViewComponent.prototype.onSaveRule = function (rule) {
        var _this = this;
        var vcurrentrule = this.getMatchingRule(rule.RuleId);
        if (vcurrentrule == null) {
            this.Rules.push(rule);
        }
        else {
            this.copyRule(rule, vcurrentrule);
        }
        Promise.resolve(this.exRulesService
            .saveExRuleChange(this.Rules)
            .then(this.afterSaveExRuleChange)
            .catch(function (error) { return _this.error = error; })
            .then(this.refreshRules));
    };
    ExRulesViewComponent.prototype.onClickRuleDelete = function (ruleid) {
        // alert("onClickRuleDelete called");
        var vcheckedrule = this.getMatchingRule(ruleid);
        var ventry = this.RulesSelectedForDelete.find(function (rule) { return rule.RuleId === ruleid; });
        if (ventry == null) {
            this.RulesSelectedForDelete.push(vcheckedrule);
        }
        else {
            this.RulesSelectedForDelete = this.RulesSelectedForDelete.filter(function (rule) { return rule.RuleId !== ruleid; });
        }
    };
    ExRulesViewComponent.prototype.onDeleteRules = function () {
        var _this = this;
        // alert("onDeleteRules called:");
        var vruleids = "";
        for (var _i = 0, _a = this.RulesSelectedForDelete; _i < _a.length; _i++) {
            var rule = _a[_i];
            vruleids += ((vruleids.length !== 0) ? "," : "") + rule.RuleId;
        }
        Promise.resolve(this.exRulesService
            .deleteRules(vruleids)
            .then(this.afterDeleteRules)
            .catch(function (error) { return _this.error = error; })
            .then(this.refreshRules));
    };
    ;
    ExRulesViewComponent.prototype.onCreateNewRule = function () {
        // alert("onCreateNewRule called");
        this.getNewRule();
        this.ruleselected.emit(this.SelectedRule);
    };
    ;
    ExRulesViewComponent.prototype.refreshRules = function () {
        // alert("refreshRules called");
        return this.getRules();
    };
    ExRulesViewComponent.prototype.copyRule = function (fromRule, toRule) {
        toRule.RuleId = fromRule.RuleId;
        toRule.RuleName = fromRule.RuleName;
        toRule.RuleDescription = fromRule.RuleDescription;
        toRule.ExamCode = fromRule.ExamCode;
        toRule.Status = fromRule.Status;
        toRule.Operator = fromRule.Operator;
    };
    ExRulesViewComponent.prototype.getMatchingRule = function (ruleid) {
        var matchedRule = null;
        for (var _i = 0, _a = this.Rules; _i < _a.length; _i++) {
            var rule = _a[_i];
            if (rule.RuleId === ruleid) {
                matchedRule = rule;
                break;
            }
        }
        return matchedRule;
    };
    ExRulesViewComponent.prototype.afterSaveExRuleChange = function (res) {
        // res ? alert("Rule is saved") : null;
        return res;
    };
    ExRulesViewComponent.prototype.afterDeleteRules = function (res) {
        // res ? alert("Selected Rule(s) are deleted") : null;
        return res;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ExRulesViewComponent.prototype, "ruleselected", void 0);
    ExRulesViewComponent = __decorate([
        core_1.Component({
            selector: 'exrules-view',
            templateUrl: '../Templates/exruleseditor/Editor2_Exam_View.html'
        }), 
        __metadata('design:paramtypes', [exrules_service_1.ExRulesService])
    ], ExRulesViewComponent);
    return ExRulesViewComponent;
}());
exports.ExRulesViewComponent = ExRulesViewComponent;
//# sourceMappingURL=exrules.view.component.js.map