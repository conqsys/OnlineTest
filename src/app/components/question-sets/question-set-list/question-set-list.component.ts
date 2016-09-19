import { Component, ViewChild, Input, Output } from '@angular/core';
import {DatePipe} from "@angular/common";

import { QuestionSetModel } from '../../../model/question-set/question-set.model';
import { QuestionSetService } from '../../../services/question-set/question-set.service';
import { Router} from '@angular/router';

@Component({
    selector:'question-set-list',
    templateUrl: '../app/components/question-sets/question-set-list/question-set-list.component.html',
})
export /**
 * QuestionSetListComponent
 */
class QuestionSetListComponent {

    title: string;
    model: QuestionSetModel[]=[];
    selectedQuestionSetId: number;
    company_id: number; 
    questionSetVisibility: boolean;

    constructor(private service: QuestionSetService, private router: Router) {
        this.title = 'Question Sets';
        this.model = new Array<QuestionSetModel>();
        this.company_id = 1;
    }

    ngOnInit(): void {
        this.getQuestionSets(this.company_id);
    }

    getQuestionSets(company_id:number): void {
        this.service.getQuestionSets(company_id)
            .then(questionSets => { 
              this.model = questionSets;
            });
    }

    selectQuestionSet(selectedQuestionSet:QuestionSetModel): void {
        this.selectedQuestionSetId = selectedQuestionSet.question_set_id; 
        
        this.router.navigate(['/questionset', this.selectedQuestionSetId]);
    }

    addQuestionSet(): void {
        this.router.navigate(['/questionset', 0]);
    }
}