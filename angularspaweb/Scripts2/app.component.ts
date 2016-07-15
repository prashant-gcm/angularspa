import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { ExRulesEditorComponent } from './exrules.editor.component';

@Component({
    selector: 'my-app',
    template: '<router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES],
    precompile: [ExRulesEditorComponent]
})
export class AppComponent { }
