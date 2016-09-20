import { Component, ViewChild, Input, Output, OnInit } from '@angular/core';
import {DatePipe} from "@angular/common";

import { QuestionSetModel } from '../../../model/question-set/question-set.model';
import { QuestionSetService } from '../../../services/question-set/question-set.service';
import { Router} from '@angular/router';

@Component({
    moduleId: module.id,
    selector:'question-set-list',
    templateUrl: 'question-set-list.component.html',
})
export /**
 * QuestionSetListComponent
 */
class QuestionSetListComponent implements OnInit {

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
// get Question set by company_id
    getQuestionSets(company_id:number): void {
        this.service.getQuestionSets(company_id)
            .then(questionSets => { 
              this.model = questionSets;
            });
    }
// navigate question_set_id to Question set component.ts
    selectQuestionSet(selectedQuestionSet:QuestionSetModel): void {
        this.selectedQuestionSetId = selectedQuestionSet.question_set_id; 
        
        this.router.navigate(['/questionset', this.selectedQuestionSetId]);
    }
// open Question set page for add Questionset 
    addQuestionSet(): void {
        this.router.navigate(['/questionset', 0]);
    }
}