function ClassRulesEditorActions() {
    this.fetchRules = function () {
        AppDispatcher.dispatch({
            actionType: RulesEditorConstants.RULESEDITOR_FETCHRULES
        });
    }

    this.fetchNewRule = function () {
        AppDispatcher.dispatch({
            actionType: RulesEditorConstants.RULESEDITOR_FETCHNEWRULE
        });
    }

    this.deleteRules = function (ids) {
        AppDispatcher.dispatch({
            actionType: RulesEditorConstants.RULESEDITOR_DELETERULE,
            ruleIds: ids
        });
    }

    this.saveRule = function (data) {
        AppDispatcher.dispatch({
            actionType: RulesEditorConstants.RULESEDITOR_SAVE,
            rule: data
        });
    }

    this.selectRule = function (id) {
        AppDispatcher.dispatch({
            actionType: RulesEditorConstants.RULESEDITOR_SELECTRULE,
            ruleId: id
        });
    }

    this.startNewRule = function (id) {
        AppDispatcher.dispatch({
            actionType: RulesEditorConstants.RULESEDITOR_STARTNEWRULE,
            ruleId: id
        });
    }
}

var RulesEditorActions = new ClassRulesEditorActions();
window.RulesEditorActions = RulesEditorActions;
