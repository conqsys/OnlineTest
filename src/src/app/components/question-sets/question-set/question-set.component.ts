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
    questions = Array<QuestionModel>();
    topics = Array<TopicModel>();

    selectedOptionSeries: string;
    selectedTopic: number;
    company_id: number;
    isAddQuestion:boolean;

    constructor(private questionSetService: QuestionSetService, 
                private questionService: QuestionService,
                private topicService: TopicService) {
        this.title = 'Question Sets';
        this.selectedOptionSeries = "Numerical Order";
        this.model = new QuestionSetModel;
        this.placeholder = new QuestionSetModel;
        this.isAddQuestion = false;
        this.company_id = 1;
        this.getQuestionSet(this.company_id, 1);
    }

    getQuestionSet(company_id, question_set_id){
        this.questionSetService.getQuestionSet(company_id, question_set_id).map(r=>r.json())
        .subscribe(result => {
            this.model = result;
            this.placeholder = result;
        })
    }

    showQuestions() {
        this.isAddQuestion = true;
        this.topicService.getTopic(this.company_id).map(r=>r.json())
        .subscribe(result => {
            this.topics = result;
            if (this.topics.length > 0) {
                this.selectedTopic = this.topics[0].topic_id;
                this.getQuestions(this.selectedTopic);
            }
        })
        
    }

    getQuestions(topic_id) {
        this.questionService.getQuestionsByTopic(topic_id).map(r=>r.json())
        .subscribe(result => {
            this.questions = result;
        })
    }

}