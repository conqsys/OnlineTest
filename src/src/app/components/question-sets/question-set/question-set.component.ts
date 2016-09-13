import { Component, ViewChild, Input, Output } from '@angular/core';
import {DatePipe, FORM_DIRECTIVES} from "@angular/common";
import { QuestionSetModel } from '../../../model/question-set/question-set.model';
import { QuestionModel } from '../../../model/question/question';
import { TopicModel } from '../../../model/topic/topic.model';
import { QuestionSetService } from '../../../services/question-set/question-set.service';
import { QuestionService } from '../../../services/question/question.service';
import { TopicService } from '../../../services/topic/topic.service';

@Component({
    selector:'question-set',
    templateUrl: '../app/components/question-sets/question-set/question-set.component.html',
    providers:[QuestionSetService, QuestionService, TopicService],
    directives: [FORM_DIRECTIVES]
})
export /**
 * QuestionSetComponent
 */
class QuestionSetComponent {

    title: string;
    model: QuestionSetModel;
    placeholder: QuestionSetModel;
    questions = QuestionModel;
    topics = Array<TopicModel>();

    constructor(private questionSetService: QuestionSetService, 
                private questionService: QuestionService,
                private topicService: TopicService) {
        this.title = 'Question Sets';
        this.model = new QuestionSetModel;
        this.placeholder = new QuestionSetModel;
        this.getQuestionSet(1, 1);
    }

    getQuestionSet(company_id, question_set_id){
        this.questionSetService.getQuestionSet(company_id, question_set_id).map(r=>r.json())
        .subscribe(result => {
            this.model = result;
            this.placeholder = result;
        })
    }

    showQuestions() {
        this.topicService.getTopic().map(r=>r.json())
        .subscribe(result => {
            this.topics = result;

            this.getQuestions(1, 0);
        })
        
    }

    getQuestions(company_id, topic_id) {
        this.questionService.getQuestions().map(r=>r.json())
        .subscribe(result => {
            this.questions = result;
        })
    }

}