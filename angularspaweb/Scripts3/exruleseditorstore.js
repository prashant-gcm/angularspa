var CHANGE_RULE_EVENT = 'change';
var NEW_RULE_EVENT = 'new';

function ExRulesEditorStore() {
    //var urlforalldata = "/angularspa/exruleseditor/api/exrulesdata/" + ExRulesEditorContext.currentConfigurationId + "/" + ExRulesEditorContext.currentSection + "/data";
    //var urlforemptydata = "/angularspa/exruleseditor/api/exrulesdata/" + ExRulesEditorContext.currentConfigurationId + "/" + ExRulesEditorContext.currentSection + "/empty";
    //var urlpost = "/angularspa/exruleseditor/api/exrulesdata2/" + ExRulesEditorContext.currentConfigurationId + "/" + ExRulesEditorContext.currentSection + "/data";
    //var urlpostdelete = "/angularspa/exruleseditor/api/exrulesdata/1/exam/data?todeleteruleids=1:exam:";
    var urlforalldata = "api/exrulesdata/" + ExRulesEditorContext.currentConfigurationId + "/" + ExRulesEditorContext.currentSection + "/data";
    var urlforemptydata = "api/exrulesdata/" + ExRulesEditorContext.currentConfigurationId + "/" + ExRulesEditorContext.currentSection + "/empty";
    var urlpost = "api/exrulesdata2/" + ExRulesEditorContext.currentConfigurationId + "/" + ExRulesEditorContext.currentSection + "/data";
    var urlpostdelete = "api/exrulesdata/1/exam/data?todeleteruleids=1:exam:";
    var Rules = [];
    var NewRule = {};
    var thisStore = this;

    this.GetRules = function () {
        return this.Rules;
    };

    this.GetNewRule = function () {
        var vrule = cloneRule(this.NewRule);
        return vrule;
    };

    this.GetRule = function (ruleid) {
        var vrule = this.GetNewRule();
        this.Rules.forEach(function (prule) {
            if (prule.RuleId == ruleid)
            {
                vrule = prule;
            }
        });
        vrule = cloneRule(vrule);
        return vrule;
    };

    this.fetchRules = function () {
        return $.getJSON(urlforalldata)
            .done(function (data) {
                thisStore.Rules = data;
            })
            .fail(function () {
                console.error("failed in fetchRules");
            });
    }

    this.fetchNewRule = function () {
        return $.getJSON(urlforemptydata)
            .done(function (data) {
                thisStore.NewRule = data[0];
            })
            .fail(function () {
                console.error("failed in fetchNewRule");
            });
    }

    this.SaveRules = function (changedrule) {
        if (changedrule.RuleId == 0) {
            changedrule.RuleId = this.getNextSeqRuleId();
            this.Rules.push(changedrule);
        } else {
            this.Rules = this.Rules.map(function (prule) {
                if (prule.RuleId == changedrule.RuleId) {
                    prule = changedrule;
                }
                return prule;
            });
        }
        return $.ajax({
            type: "POST",
            url: urlpost,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(this.Rules)
        }).done(function () {
            console.log("save completed");
        }).fail(function () {
            console.log("save failed");
        });
    }

    this.DeleteRule = function (pruleids) {
        this.Rules = this.Rules.filter(function (prule) {
            return ("," + pruleids + ",").indexOf("," + prule.RuleId + ",") == -1;
        });

        return $.ajax({
            type: "DELETE",
            url: urlpostdelete + pruleids
        }).done(function () {
            console.log("delete completed");
        }).fail(function () {
            console.log("delete failed");
        });
    }

    this.emitNewRule = function (prule) {
        this.emit(NEW_RULE_EVENT, prule);
    }

    this.emitChangeRule = function (prules) {
        this.emit(CHANGE_RULE_EVENT, prules);
    }

    this.addNewRuleListener = function (callback) {
        this.on(NEW_RULE_EVENT, callback);
    }

    this.removeNewRuleListener = function (callback) {
        this.removeListener(NEW_RULE_EVENT, callback);
    }

    this.addChangeRuleListener = function (callback) {
        this.on(CHANGE_RULE_EVENT, callback);
    }

    this.removeChangeRuleListener = function (callback) {
        this.removeListener(CHANGE_RULE_EVENT, callback);
    }

    this.getNextSeqRuleId = function () {
        var vlastruleid = 0;
        for (var rcnt = 0; rcnt < this.Rules.length; rcnt++) {
            var arule = this.Rules[rcnt];
            if (arule.RuleId > vlastruleid) {
                vlastruleid = arule.RuleId;
            }
        }
        return (vlastruleid + 1);
    }

    function cloneRule(prule) {
        var clonedrule;
        if (ExRulesEditorContext.currentSection == "exam") {
            clonedrule = new ExamRule();
            clonedrule.RuleId = prule.RuleId;
            clonedrule.RuleName = prule.RuleName;
            clonedrule.RuleDescription = prule.RuleDescription;
            clonedrule.ExamCode = prule.ExamCode;
            clonedrule.Status = prule.Status;
            clonedrule.Grade = prule.Grade;
            clonedrule.Operator = prule.Operator;
        }
        return clonedrule;
    }
};

function ExamRule() {
    this.RuleId = 0;
    this.RuleName = "";
    this.RuleDescription = "";
    this.ExamCode = "";
    this.Status = "";
    this.Grade = "";
    this.Operator = "";
}

var Store = null;
var Events = null;

function ExRulesEditorStoreFactory() {
    this.GetStoreInstance = function () {
        if (typeof window.Store == "undefined") {
            Store = new ExRulesEditorStore();
            Events = new EventEmitter();
            jQuery.extend(Store, Events);
            window.Store = Store;
        }
        return window.Store;
    };
}

AppDispatcher.register(function (action) {
        var Store = (new ExRulesEditorStoreFactory()).GetStoreInstance();
        switch (action.actionType)
        {
            case RulesEditorConstants.RULESEDITOR_FETCHRULES:
                Store.fetchRules().done(function (data) {
                    Store.emitChangeRule(Store.GetRules());
                });
                break;
            case RulesEditorConstants.RULESEDITOR_FETCHNEWRULE:
                Store.fetchNewRule().done(function (data) {
                    Store.emitNewRule(Store.GetNewRule());
                });
                break;
            case RulesEditorConstants.RULESEDITOR_SAVE:
                Store.SaveRules(action.rule).done(function () {
                    Store.emitChangeRule(Store.GetRules());
                    Store.emitNewRule(Store.GetNewRule());
                });
                break;
            case RulesEditorConstants.RULESEDITOR_DELETERULE:
                Store.DeleteRule(action.ruleIds).done(function () {
                    Store.emitChangeRule(Store.GetRules());
                    Store.emitNewRule(Store.GetNewRule());
                });
                break;
            case RulesEditorConstants.RULESEDITOR_SELECTRULE:
                Store.emitNewRule(Store.GetRule(action.ruleId));
                break;
            case RulesEditorConstants.RULESEDITOR_STARTNEWRULE:
                Store.emitNewRule(Store.GetNewRule());
                break;
        }
    }
);
