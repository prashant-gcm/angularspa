"use strict";
var router_1 = require('@angular/router');
var exrules_editor_component_1 = require('./exrules.editor.component');
var routes = [
    {
        path: '',
        redirectTo: 'exam',
        pathMatch: 'full'
    },
    {
        path: 'exruleseditor/editor2',
        redirectTo: 'exam',
        pathMatch: 'full'
    },
    {
        path: 'exam',
        component: exrules_editor_component_1.ExRulesEditorComponent
    }
];
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(routes)
];
//# sourceMappingURL=app.routes.js.map