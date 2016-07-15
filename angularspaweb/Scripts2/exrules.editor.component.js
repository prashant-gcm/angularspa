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
var exrules_view_component_1 = require('./exrules.view.component');
var exrules_form_component_1 = require('./exrules.form.component');
var exrules_service_1 = require('./exrules.service');
var ExRulesEditorComponent = (function () {
    function ExRulesEditorComponent() {
    }
    ExRulesEditorComponent.prototype.onRuleSelected = function (rule) {
        // alert("onRuleSelected called: " + this.SelectedRule.RuleId);
        this.SelectedRule = rule;
    };
    ExRulesEditorComponent = __decorate([
        core_1.Component({
            selector: 'exrules-editor',
            template: "<exrules-view (ruleselected)=\"onRuleSelected($event)\" #exrulesview></exrules-view>\n               <exrules-form [CurrentRule]=\"SelectedRule\" (rulesave)=\"exrulesview.onSaveRule($event)\"></exrules-form>\n",
            directives: [exrules_view_component_1.ExRulesViewComponent, exrules_form_component_1.ExRulesFormComponent],
            providers: [exrules_service_1.ExRulesService]
        }), 
        __metadata('design:paramtypes', [])
    ], ExRulesEditorComponent);
    return ExRulesEditorComponent;
}());
exports.ExRulesEditorComponent = ExRulesEditorComponent;
//# sourceMappingURL=exrules.editor.component.js.map