import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Rule } from './Rule';
import { ExRulesService } from './exrules.service';

@Component({
    selector: 'exrules-form',
    templateUrl: '../Templates/exruleseditor/Editor2_Exam_Form.html'
})
export class ExRulesFormComponent implements OnInit {
    @Input()
    CurrentRule: Rule;

    error: any;

    @Output()
    rulesave = new EventEmitter();

    constructor(private exRulesService: ExRulesService) { }

    ngOnInit(): void {
        this.getNewRule();
    }

    private getNewRule(): void {
        this.CurrentRule = new Rule();
    }

    onSaveExRuleChange(event: any): boolean {
        // alert("onSaveExRuleChange called: " + JSON.stringify(this.CurrentRule));

        this.rulesave.emit(this.CurrentRule);
        return false;
    }
}
