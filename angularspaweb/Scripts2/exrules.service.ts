import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import './rxjs-operators';

import { Rule }           from './Rule';

@Injectable()
export class ExRulesService {
    constructor(private http: Http) {
    }

    //private urlget = "/angularspa/exruleseditor/api/exrulesdata/1/exam/data";
    //private urlpost = "/angularspa/exruleseditor/api/exrulesdata2/1/exam/data";
    //private urlpostdelete = "/angularspa/exruleseditor/api/exrulesdata/1/exam/data?todeleteruleids=1:exam:";
    private urlget = "/api/exrulesdata/1/exam/data";
    private urlpost = "/api/exrulesdata2/1/exam/data";
    private urlpostdelete = "/api/exrulesdata/1/exam/data?todeleteruleids=1:exam:";

    fetchRules(): Promise<Rule[]> {
        return this.http.get(this.urlget)
            .toPromise()
            .then(this.afterFetchRules)
            .catch(this.handleError);
    }

    saveExRuleChange(rule: Rule[]): Promise<boolean> {
        let body: string = JSON.stringify(rule);
        let headersoption: Headers = new Headers();
        headersoption.append('Content-Type', 'application/json');
        let options: RequestOptions = new RequestOptions({ headers: headersoption });

        return this.http.post(this.urlpost, body, options)
            .toPromise()
            .then(this.afterSaveExRuleChange)
            .catch(this.handleError);
    }

    deleteRules(deleteruleids: string): Promise<boolean> {
        let options: RequestOptions = new RequestOptions();

        return this.http.delete(this.urlpostdelete + deleteruleids, options)
            .toPromise()
            .then(this.afterDeleteRules)
            .catch(this.handleError);
    }

    private afterFetchRules(res: Response): Rule[] {
        let body: any = res.json();
        let tempRules: Rule[] = new Array<Rule>();
        for(let rule of body){
            if (rule.ExamCode == null) { rule.ExamCode = ""; }
            if (rule.Operator == null) { rule.Operator = ""; }
            if (rule.RuleDescription == null) { rule.RuleDescription = ""; }
            if (rule.RuleName == null) { rule.RuleName = ""; }
            if (rule.Status == null) { rule.Status = ""; }
            tempRules.push(rule);
        }
        return tempRules;
    }

    private afterSaveExRuleChange(res: Response): boolean {
        return true;
    }

    private afterDeleteRules(res: Response): boolean {
        return true;
    }

    private handleError(error: any): Promise<void> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}