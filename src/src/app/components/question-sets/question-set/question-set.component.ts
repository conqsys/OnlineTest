import { Component, ViewChild, Input, Output } from '@angular/core';
import {DatePipe, FORM_DIRECTIVES} from "@angular/common";
import { QuestionSetModel } from '../../../model/question-set/question-set.model';
import { QuestionSetService } from '../../../services/question-set/question-set.service';

@Component({
    selector:'question-set',
    templateUrl: '../app/components/question-sets/question-set/question-set.component.html',
    providers:[QuestionSetService],
    directives: [FORM_DIRECTIVES]
})
export /**
 * QuestionSetComponent
 */
class QuestionSetComponent {

    title: string;
    model: Array<QuestionSetModel>=[];

    constructor(private questionSetService: QuestionSetService) {
        this.title = 'Question Sets';
        this.model = new Array<QuestionSetModel>();
        this.getQuestionSet(1, 1);
    }

    getQuestionSet(company_id, question_set_id){
        this.questionSetService.getQuestionSet(company_id, question_set_id).map(r=>r.json())
        .subscribe(result => {
            this.model = result;
            //this.model.question_set_questions = result.questions;
        })
    }
}