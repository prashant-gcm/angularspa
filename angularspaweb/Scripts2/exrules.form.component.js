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
var ExRulesFormComponent = (function () {
    function ExRulesFormComponent(exRulesService) {
        this.exRulesService = exRulesService;
        this.rulesave = new core_1.EventEmitter();
    }
    ExRulesFormComponent.prototype.ngOnInit = function () {
        this.getNewRule();
    };
    ExRulesFormComponent.prototype.getNewRule = function () {
        this.CurrentRule = new Rule_1.Rule();
    };
    ExRulesFormComponent.prototype.onSaveExRuleChange = function (event) {
        // alert("onSaveExRuleChange called: " + JSON.stringify(this.CurrentRule));
        this.rulesave.emit(this.CurrentRule);
        return false;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Rule_1.Rule)
    ], ExRulesFormComponent.prototype, "CurrentRule", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ExRulesFormComponent.prototype, "rulesave", void 0);
    ExRulesFormComponent = __decorate([
        core_1.Component({
            selector: 'exrules-form',
            templateUrl: '../Templates/exruleseditor/Editor2_Exam_Form.html'
        }), 
        __metadata('design:paramtypes', [exrules_service_1.ExRulesService])
    ], ExRulesFormComponent);
    return ExRulesFormComponent;
}());
exports.ExRulesFormComponent = ExRulesFormComponent;
//# sourceMappingURL=exrules.form.component.js.map