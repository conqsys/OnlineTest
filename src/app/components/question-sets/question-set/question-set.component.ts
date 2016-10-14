import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';

import {BaseComponent} from '../../base.component';

import { QuestionSet, QuestionSetQuestion } from '../../../shared/model/question-set/question-set.model';
import { Question } from '../../../shared/model/question/question.model';
import { Topic } from '../../../shared/model/topic/topic.model';
import { OptionSeries } from '../../../shared/model/question/question-option.model';

import { QuestionSetService } from '../../../shared/services/question-set/question-set.service';
import { QuestionService } from '../../../shared/services/question/question.service';
import { TopicService } from '../../../shared/services/topic/topic.service';
import { QuestionOptionService } from '../../../shared/services/question-option/question-option.service';

@Component({
    moduleId: module.id,
    selector: 'question-set',
    templateUrl: 'question-set.component.html',
})
export /**
 * QuestionSetComponent
 */
    class QuestionSetComponent extends BaseComponent implements OnInit {

    title: string;
    model: QuestionSet;
    questions: Question[] = [];
    topics: Topic[] = [];
    optionSeries: OptionSeries[] = [];
    selectedTopic: number;
    isAddQuestion: boolean;
    question_set_id: number;

    constructor(private questionSetService: QuestionSetService,
        private questionService: QuestionService,
        private topicService: TopicService,
        private questionOptionService: QuestionOptionService,
        private activatedRoute: ActivatedRoute,
        localStorageService: LocalStorageService,
        router: Router) {
        super(localStorageService, router);
        this.title = 'Question Sets';
        this.model = new QuestionSet();
        this.model.question_set_questions = Array<QuestionSetQuestion>();
        this.isAddQuestion = false;
    }

    ngOnInit(): void {
        if (this.user) {
            this.activatedRoute.params.subscribe(params => {
                this.question_set_id = +params['question_set_id']; // (+) converts string 'id' to a number
            });
            this.getOptionSeries();
        }
    }

    getOptionSeries(): void {
        this.questionOptionService.getOptionSeries().then(optionSeries => {
            this.optionSeries = optionSeries;

            if (this.question_set_id !== 0 && this.question_set_id !== undefined) {
                this.getQuestionSet(this.user.company_id, this.question_set_id);
            } else {
                this.model.question_set_id = this.question_set_id;
                this.model.question_set_title = '';
                this.model.total_time = '';
                this.model.company_id = this.user.company_id;
                this.model.total_questions = 0;
                this.model.is_randomize = false;
                this.model.option_series_id = 2;
                this.model.question_set_questions = [];
            }
        });
    }

    getQuestionSet(company_id: number, question_set_id: number): void {
        this.questionSetService.getQuestionSet(company_id, question_set_id)
            .then(questionSet => {
                this.model = questionSet;
            });
    }

    showQuestions(): void {
        this.isAddQuestion = true;
        this.topicService.getTopic(this.user.company_id)
            .then(topics => {
                this.topics = topics;
                if (this.topics.length > 0) {
                    this.selectedTopic = this.topics[0].topic_id;
                    this.getQuestions(this.selectedTopic);
                }
            });
    }

    getQuestions(topic_id: number): void {
        this.questionService.getQuestionsByTopic(topic_id)
            .then(questions => {
                this.questions = [];
                for (let i = 0; i < questions.length; i++) {
                    let selectedQuestion = this.model.question_set_questions.filter(
                        ques => ques.question_id === questions[i].question_id && ques.is_deleted === 0);

                    if (selectedQuestion.length === 0) {
                        this.questions.splice(this.questions.length, 0, questions[i]);
                    }
                }
            });
    }

    addQuestionsInQuestionSet(): void {
        this.isAddQuestion = false;

        let selectedQuestions = this.questions.filter(ques => ques.is_selected === true);
        for (let i = 0; i < selectedQuestions.length; i++) {
            let deletedQuestion = this.model.question_set_questions.filter(ques => ques.question_id === selectedQuestions[i].question_id);
            if (deletedQuestion.length > 0) {
                deletedQuestion[0].is_deleted = 0;
            } else {
                let obj = {
                    question_set_question_id: 0,
                    question_set_id: this.question_set_id,
                    question_id: selectedQuestions[i].question_id,
                    question_description: selectedQuestions[i].question_description,
                    is_deleted: 0
                };
                this.model.question_set_questions.splice(this.model.question_set_questions.length, 0, obj);
            }
        }
    }

    saveQuestionSet(): void {
        this.model.created_by = this.user.user_id;
        this.model.updated_by = this.user.user_id;

        this.questionSetService.saveQuestionSet(this.model)
            .then(result => {
                this.router.navigate(['/questionSets']);
            });
    }

    deleteSetQuestion(question: QuestionSetQuestion, index: number): void {
        if (question.question_set_question_id === 0) {
            this.model.question_set_questions.splice(index, 1);
        } else {
            question.is_deleted = 1;
        }
    }
}
