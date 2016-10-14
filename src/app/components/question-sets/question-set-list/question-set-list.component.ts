import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';

import { BaseComponent } from '../../base.component';

import { QuestionSet } from '../../../model/question-set/question-set.model';
import { QuestionSetService } from '../../../services/question-set/question-set.service';

@Component({
    moduleId: module.id,
    selector: 'question-set-list',
    templateUrl: 'question-set-list.component.html'
})
export /**
 * QuestionSetListComponent
 */
    class QuestionSetListComponent extends BaseComponent implements OnInit {

    title: string;
    model: QuestionSet[] = [];
    selectedQuestionSetId: number;
    questionSetVisibility: boolean;

    constructor(private questionSetService: QuestionSetService,
        localStorageService: LocalStorageService,
        router: Router) {
        super(localStorageService, router);

        this.title = 'Question Sets';
        this.model = new Array<QuestionSet>();
    }

    ngOnInit(): void {
        if (this.user) {
            this.getQuestionSets();
        }
    }

    getQuestionSets(): void {
        this.questionSetService.getQuestionSets(this.user.company_id)
            .then(questionSets => {
                this.model = questionSets;
            });
    }

    selectQuestionSet(selectedQuestionSet: QuestionSet): void {
        this.selectedQuestionSetId = selectedQuestionSet.question_set_id;
        this.router.navigate(['/questionSet', this.selectedQuestionSetId]);
    }

    addQuestionSet(): void {
        this.router.navigate(['/questionSet', 0]);
    }
}
