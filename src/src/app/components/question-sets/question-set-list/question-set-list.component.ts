import { Component, ViewChild, Input, Output } from '@angular/core';
import {DatePipe, FORM_DIRECTIVES} from "@angular/common";
import { QuestionSetModel } from '../../../model/question-set/question-set.model';
import { QuestionSetService } from '../../../services/question-set/question-set.service';

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

    constructor(private questionSetService: QuestionSetService) {
        this.title = 'Question Sets';
        this.model = new Array<QuestionSetModel>();
        this.getQuestionSets(1);
    }

    getQuestionSets(company_id){
        this.questionSetService.getQuestionSets(company_id).map(r=>r.json())
        .subscribe(result => {
            this.model = result;
        })
    }

    selectQuestionSet(selectedQuestionSet){
        this.selectedQuestionSetId = selectedQuestionSet.question_set_id; 
    }
}