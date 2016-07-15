import { Component } from '@angular/core';

import { ExRulesViewComponent } from './exrules.view.component';
import { ExRulesFormComponent } from './exrules.form.component';
import { ExRulesService } from './exrules.service';
import { Rule } from './Rule';

@Component({
    selector: 'exrules-editor',
    template: `<exrules-view (ruleselected)="onRuleSelected($event)" #exrulesview></exrules-view>
               <exrules-form [CurrentRule]="SelectedRule" (rulesave)="exrulesview.onSaveRule($event)"></exrules-form>
`,
    directives: [ExRulesViewComponent, ExRulesFormComponent],
    providers: [ExRulesService]
})
export class ExRulesEditorComponent {
    SelectedRule: Rule;

    onRuleSelected(rule: Rule): void {
        // alert("onRuleSelected called: " + this.SelectedRule.RuleId);
        this.SelectedRule = rule;
    }
}
