import { Component, ViewChild, Input, Output } from '@angular/core';
import {DatePipe, FORM_DIRECTIVES} from "@angular/common";

import { QuestionSetModel } from '../../../model/question-set/question-set.model';
import { QuestionSetService } from '../../../services/question-set/question-set.service';
import { Router} from '@angular/router';

@Component({
    selector:'question-set-list',
    templateUrl: '../app/components/question-sets/question-set-list/question-set-list.component.html',
    providers:[QuestionSetService],
    directives: [FORM_DIRECTIVES]
})
export /**
 * QuestionSetListComponent
 */
class QuestionSetListComponent {

    title: string;
    model: Array<QuestionSetModel>=[];
    selectedQuestionSetId: number;
    company_id: number; 
    questionSetVisibility: boolean;

    constructor(private questionSetService: QuestionSetService, private _router: Router) {
        this.title = 'Question Sets';
        this.model = new Array<QuestionSetModel>();
        this.company_id = 1;
    }

    ngOnInit() {
        this.getQuestionSets(this.company_id);
    }

    getQuestionSets(company_id){
        this.questionSetService.getQuestionSets(company_id).map(r=>r.json())
        .subscribe(result => {
            this.model = result;
        })
    }

    selectQuestionSet(selectedQuestionSet){
        this.selectedQuestionSetId = selectedQuestionSet.question_set_id; 
        this._router.navigate(['/questionset/'+ this.selectedQuestionSetId]);
    }

    addQuestionSet() {
        this._router.navigate(['/questionset/0']);
    }
}