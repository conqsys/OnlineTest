import { Component, OnInit, Input,Output,EventEmitter} from '@angular/core';
import {CheckBoxComponent} from '../../check-box/check-box.component'
import {RadioComponent} from '../../radio/radio.component'
import {FroalaEditorCompnoent} from "ng2-froala-editor/ng2-froala-editor";
import {QuestionModel} from '../../../model/question/question';
import {QuestionOptionModel} from '../../../model/question/question-option'
import { TopicService } from '../../../services/topic/topic.service';
import { QuestionService } from '../../../services/question/question.service';
import { TopicModel } from '../../../model/topic/topic.model';

@Component({
  moduleId: module.id,
  selector: 'app-question',
  templateUrl: 'question.component.html',
  styleUrls: ['question.component.css'],
  providers: [QuestionService, TopicService],

  directives: [CheckBoxComponent, RadioComponent, FroalaEditorCompnoent]
})
export class QuestionComponent implements OnInit {
  @Input() model: QuestionModel
  @Output()
    setQuestionVisibility: EventEmitter<boolean>;
  company_id: number;
  topics = Array<TopicModel>();
  selectedTopic: number;

  private newOption: string;
  // text: string = '<div>Hey we are testing Froala Editor</div>';
  //   editor: any;

  //   froalaOptions: any = {
  //     height: 300
  //   };

  constructor(private questionService: QuestionService,private topicService: TopicService) {
            this.setQuestionVisibility = new EventEmitter<boolean>();

    this.model = new QuestionModel();
    this.model.options = new Array<QuestionOptionModel>();
    this.model.answer_explanation = "";
    this.model.question_description = "";
    this.company_id = 1;
    this.newOption = "";

  }
  valueChanged(value) {
    // alert(JSON.stringify(value));
    console.log(value);
    this.model.is_multiple_option = !this.model.is_multiple_option;
  }
  //   onFroalaModelChanged(event: any) {
  //     setTimeout(() => {
  //       this.text = event;
  //     });
  //   }
  //  onEditorInitialized(event?: any) {
  //    alert("success");
  //     this.editor = FroalaEditorCompnoent.getFroalaInstance();
  //     this.editor.on('froalaEditor.focus', (e, editor) => {
  //       console.log("editor is focused");
  //     });
  //   }
  addOption() {
    if (this.newOption === "")
      alert("can not be blank");
    else
      this.model.options.push({ description: this.newOption, is_correct: false, option_id: 0, question_id: this.model.question_id });
    this.newOption = "";

  }
  ngOnInit() {
    this.topicService.getTopic(this.company_id).map(r => r.json())
      .subscribe(result => {
        this.topics = result;
        if (this.topics.length > 0) {

        }
      })
  }
  saveQuestion(){
 this.setQuestionVisibility.emit(false);
  }
  cancel(){
     this.setQuestionVisibility.emit(false);
  }

}
