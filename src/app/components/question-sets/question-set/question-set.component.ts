import { Component, ViewChild, Input, Output, OnInit } from '@angular/core';
import {DatePipe} from "@angular/common";
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionSetModel, QuestionSetQuestionsModel } from '../../../model/question-set/question-set.model';
import { QuestionModel } from '../../../model/question/question';
import { TopicModel } from '../../../model/topic/topic.model';
import { QuestionSetService } from '../../../services/question-set/question-set.service';
import { QuestionService } from '../../../services/question/question.service';
import { TopicService } from '../../../services/topic/topic.service';

@Component({
    moduleId: module.id,
    selector:'question-set',
    templateUrl: 'question-set.component.html',
})
export /**
 * QuestionSetComponent
 */
class QuestionSetComponent implements OnInit {

    title: string;
    model: QuestionSetModel;
    questions: QuestionModel[]=[];
    topics: TopicModel[]=[];
    selectedTopic: number;
    company_id: number;
    isAddQuestion:boolean;
    question_set_id: number
    
    constructor(private service: QuestionSetService, 
                private questionService: QuestionService,
                private topicService: TopicService,
                private activatedRoute: ActivatedRoute, 
                private router:Router) {
        this.title = 'Question Sets';
        this.model = new QuestionSetModel();
        this.model.question_set_questions = Array<QuestionSetQuestionsModel>();
        this.isAddQuestion = false;
        this.company_id = 1;
    }

    ngOnInit(): void {

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
// get Question Set by company_id and question_set_id
    getQuestionSet(company_id:number, question_set_id:number): void {
        this.service.getQuestionSet(company_id, question_set_id)
            .then(questionSet => { 
              this.model = questionSet;
            });
    }
// get topic_id by company_id then get Question by topic_id 
    showQuestions(): void {
        this.isAddQuestion = true;
        this.topicService.getTopic(this.company_id)
            .then(topics => { 
              this.topics = topics;
                if (this.topics.length > 0) {
                    this.selectedTopic = this.topics[0].topic_id;
                    this.getQuestions(this.selectedTopic);
                }
          });
    }
// get Question by topic_id 
    getQuestions(topic_id:number): void {
        this.questionService.getQuestionsByTopic(topic_id)
            .then(questions => { 
                this.questions = [];
                for (var i = 0; i < questions.length; i++) {
                    var selectedQuestion = this.model.question_set_questions.filter(
                                            ques => ques.question_id === questions[i].question_id && ques.is_deleted === 0);
                    
                    if(selectedQuestion.length == 0) {
                        this.questions.splice(this.questions.length,0, questions[i]);
                    }
                }
            });
    }
// add Question in Question Set
    addQuestionsInQuestionSet(): void {
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

// save Question Set  
    saveQuestionSet(): void {
        this.model.created_by = 'admin';
        this.model.updated_by = 'admin';
        this.service.saveQuestionSet(this.model)
            .then(result => { 
                this.router.navigate(['/questionsets']);
            });
    }
// delete Question set by question_id
    deleteSetQuestion(question:QuestionSetQuestionsModel, index:number): void {
        if(question.set_question_id == 0){
            this.model.question_set_questions.splice(index,1);
        }
        else {
            question.is_deleted = 1;
        }
    }

}