import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {CheckBoxComponent} from '../../check-box/check-box.component'
import {RadioComponent} from '../../radio/radio.component'
import {QuestionModel} from '../../../model/question/question';
import {QuestionOptionModel} from '../../../model/question/question-option'
import { TopicService } from '../../../services/topic/topic.service';
import { QuestionService } from '../../../services/question/question.service';
import { TopicModel } from '../../../model/topic/topic.model';
import { QuestionOptionService } from '../../../services/question-option/question-option.service';

declare var tinymce: any; 
@Component({
  moduleId: module.id,
  selector: 'app-question',
  templateUrl: 'question.component.html',
  styleUrls: ['question.component.css'],
  providers: [QuestionService, TopicService,QuestionOptionService],

  directives: [CheckBoxComponent, RadioComponent]
})
export class QuestionComponent implements OnInit {
  @Input() model: QuestionModel
  @Output()
  setQuestionVisibility: EventEmitter<boolean>;
  company_id: number;
      question_id: number

  topics = Array<TopicModel>();
  selectedTopic: number;
  win:any
  fieldname:any;
  private newOption: string;
  // text: string = '<div>Hey we are testing Froala Editor</div>';
  //   editor: any;

  //   froalaOptions: any = {
  //     height: 300
  //   };

  constructor(private questionService: QuestionService,
   private topicService: TopicService, private activatedRoute: ActivatedRoute,
    private questionOptionService: QuestionOptionService,
     private _router: Router) {
    this.setQuestionVisibility = new EventEmitter<boolean>();

    this.model = new QuestionModel();
    this.model.options = new Array<QuestionOptionModel>();
    this.model.answer_explanation = "";
    this.model.question_description = "";
    this.company_id = 1;
    this.newOption = "";
     this.model.is_multiple_option=false;
    this.model.company_id=1;
    this.model.created_by="admin";
    this.model.updated_by="admin";
    this.model.question_id=0;

  }
  valueChanged(value) {
    // alert(JSON.stringify(value));
    console.log(value);
    this.model.is_multiple_option = !this.model.is_multiple_option;
    this.model.options.forEach(function(option){
      option.is_correct=false;
    });
  }
  
  addOption() {
    if (this.newOption === "")
      alert("can not be blank");
    else
      this.model.options.push({ description: this.newOption, is_correct: false, option_id: 0, question_id: this.model.question_id });
    this.newOption = "";

  }
  ngOnInit() {
       var subscriptions = this.activatedRoute.params.subscribe(params => {
         this.question_id = +params['question_id']; // (+) converts string 'id' to a number
        });
        if(this.question_id!==0){
          this.questionService.getQuestionById(this.question_id).map(r => r.json())
      .subscribe(result => {
        this.model = result;
        
      });
        }
    tinymce.init(
      {
        selector: ".tinyMCE",
        plugins: "image",
        menubar: "file edit insert view format table tools",
        toolbar: "image",
        images_upload_url:'http://localhost:1337/file/upload',
        file_browser_callback: function (field_name, url, type, win) {
          if (type == 'image') $('#my_form input').click();
          // this.win=win;
          // this.fieldname=field_name;
            // win.document.getElementById(field_name).value = 'my browser value';
        }
      })
    this.topicService.getTopic(this.company_id).map(r => r.json())
      .subscribe(result => {
        this.topics = result;
        if (this.topics.length > 0) {

        }
      })
  }
  // FileChanged(value)
  // {
  //   alert(value);
  //   $('#my_form').submit();
  // }
  saveQuestion() {
    this.questionService.saveQuestion(this.model).map(r => r.json())
      .subscribe(result => {
      this._router.navigate(['/questions']);
      })
    //this.setQuestionVisibility.emit(false);
  }
  cancel() {
    this._router.navigate(['/questions']);
  }

}
