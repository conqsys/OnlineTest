import { Component, ViewChild, Input, Output } from '@angular/core';
import {DatePipe, FORM_DIRECTIVES} from "@angular/common";
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionSetModel, QuestionSetQuestionsModel } from '../../../model/question-set/question-set.model';
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
    questions: Array<QuestionModel>=[];
    topics: Array<TopicModel>=[];

    selectedTopic: number;
    company_id: number;
    isAddQuestion:boolean;
    question_set_id: number

    constructor(private questionSetService: QuestionSetService, 
                private questionService: QuestionService,
                private topicService: TopicService,
                private activatedRoute: ActivatedRoute, 
                private _router:Router) {
        this.title = 'Question Sets';
        this.model = new QuestionSetModel();
        this.model.question_set_questions = Array<QuestionSetQuestionsModel>();
        this.placeholder = new QuestionSetModel();
        this.isAddQuestion = false;
        this.company_id = 1;
    }

    ngOnInit() {

        var subscriptions = this.activatedRoute.params.subscribe(params => {
         this.question_set_id = +params['question_set_id']; // (+) converts string 'id' to a number
        });

        if(this.question_set_id != 0 && this.question_set_id != undefined) {
            this.getQuestionSet(this.company_id, this.question_set_id);
        }
        else {  
            this.model.question_set_id=this.question_set_id;
            this.model.question_set_title="";
            this.model.total_time="";
            this.model.company_id=this.company_id;
            this.model.total_questions=0;
            this.model.is_randomize=false;
            this.model.option_series="Numerical Order";
            this.model.question_set_questions= [];
        }
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
            this.questions = [];
            for (var i = 0; i < result.length; i++) {
                var selectedQuestion = this.model.question_set_questions.filter(
                                        ques => ques.question_id === result[i].question_id && ques.is_deleted === 0);
                
                if(selectedQuestion.length == 0) {
                    this.questions.splice(this.questions.length,0, result[i]);
                }
            }
        })
    }

    addQuestionsInQuestionSet(){
        this.isAddQuestion = false;

        var selectedQuestions = this.questions.filter(ques => ques.is_selected === true);
        for (var i = 0; i < selectedQuestions.length; i++) {
            var deletedQuestion = this.model.question_set_questions.filter(ques => ques.question_id === selectedQuestions[i].question_id);
            if(deletedQuestion.length > 0) {
                deletedQuestion[0].is_deleted = 0;
            }
            else {
                var obj = { set_question_id: 0, question_set_id: this.question_set_id, question_id: selectedQuestions[i].question_id, question_description: selectedQuestions[i].question_description, is_deleted: 0 }
                this.model.question_set_questions.splice(this.model.question_set_questions.length,0, obj)
            }    
        }
    }

    saveQuestionSet(){
        this.model.created_by = 'admin';
        this.model.updated_by = 'admin';
        this.questionSetService.saveQuestionSet(this.model).map(r=>r.json())
        .subscribe(result => {
            this._router.navigate(['/questionsets']);
        })
    }

    deleteSetQuestion(question, index){
        if(question.set_question_id == 0){
            this.model.question_set_questions.splice(index,1);
        }
        else {
            question.is_deleted = 1;
        }
    }

}