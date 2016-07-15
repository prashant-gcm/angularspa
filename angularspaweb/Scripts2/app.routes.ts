import { provideRouter, RouterConfig }  from '@angular/router';

import { ExRulesEditorComponent } from './exrules.editor.component';

const routes: RouterConfig = [
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
        component: ExRulesEditorComponent
    }
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];
