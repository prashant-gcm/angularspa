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
var http_1 = require('@angular/http');
require('./rxjs-operators');
var ExRulesService = (function () {
    function ExRulesService(http) {
        this.http = http;
        //private urlget = "/angularspa/exruleseditor/api/exrulesdata/1/exam/data";
        //private urlpost = "/angularspa/exruleseditor/api/exrulesdata2/1/exam/data";
        //private urlpostdelete = "/angularspa/exruleseditor/api/exrulesdata/1/exam/data?todeleteruleids=1:exam:";
        this.urlget = "/api/exrulesdata/1/exam/data";
        this.urlpost = "/api/exrulesdata2/1/exam/data";
        this.urlpostdelete = "/api/exrulesdata/1/exam/data?todeleteruleids=1:exam:";
    }
    ExRulesService.prototype.fetchRules = function () {
        return this.http.get(this.urlget)
            .toPromise()
            .then(this.afterFetchRules)
            .catch(this.handleError);
    };
    ExRulesService.prototype.saveExRuleChange = function (rule) {
        var body = JSON.stringify(rule);
        var headersoption = new http_1.Headers();
        headersoption.append('Content-Type', 'application/json');
        var options = new http_1.RequestOptions({ headers: headersoption });
        return this.http.post(this.urlpost, body, options)
            .toPromise()
            .then(this.afterSaveExRuleChange)
            .catch(this.handleError);
    };
    ExRulesService.prototype.deleteRules = function (deleteruleids) {
        var options = new http_1.RequestOptions();
        return this.http.delete(this.urlpostdelete + deleteruleids, options)
            .toPromise()
            .then(this.afterDeleteRules)
            .catch(this.handleError);
    };
    ExRulesService.prototype.afterFetchRules = function (res) {
        var body = res.json();
        var tempRules = new Array();
        for (var _i = 0, body_1 = body; _i < body_1.length; _i++) {
            var rule = body_1[_i];
            if (rule.ExamCode == null) {
                rule.ExamCode = "";
            }
            if (rule.Operator == null) {
                rule.Operator = "";
            }
            if (rule.RuleDescription == null) {
                rule.RuleDescription = "";
            }
            if (rule.RuleName == null) {
                rule.RuleName = "";
            }
            if (rule.Status == null) {
                rule.Status = "";
            }
            tempRules.push(rule);
        }
        return tempRules;
    };
    ExRulesService.prototype.afterSaveExRuleChange = function (res) {
        return true;
    };
    ExRulesService.prototype.afterDeleteRules = function (res) {
        return true;
    };
    ExRulesService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    ExRulesService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ExRulesService);
    return ExRulesService;
}());
exports.ExRulesService = ExRulesService;
//# sourceMappingURL=exrules.service.js.map