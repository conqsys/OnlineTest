import { Component, OnInit ,Input} from '@angular/core';
import{CheckBoxComponent} from '../../check-box/check-box.component'
import{RadioComponent} from '../../radio/radio.component'
import {FroalaEditorCompnoent} from "ng2-froala-editor/ng2-froala-editor";
import {QuestionModel} from '../../../model/question/question';
import {QuestionOptionModel} from '../../../model/question/questionOption'

@Component({
  moduleId: module.id,
  selector: 'app-question',
  templateUrl: 'question.component.html',
  styleUrls: ['question.component.css'],
  directives: [CheckBoxComponent,RadioComponent,FroalaEditorCompnoent]
})
export class QuestionComponent implements OnInit {
 @Input() model:QuestionModel
private newOption:string;
// text: string = '<div>Hey we are testing Froala Editor</div>';
//   editor: any;
 
//   froalaOptions: any = {
//     height: 300
//   };
 
  constructor() {
    this.model=new QuestionModel();
    this.model.options=new Array<QuestionOptionModel>();
    this.model.answer_explanation="";
    this.model.question_description="";
   
    this.newOption="";
   
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
    if(this.newOption==="")
    alert("can not be blank");
    else
    this.model.options.push({description:this.newOption,is_correct:false,option_id:1,question_id:1});
    this.newOption="";
   
  }
  ngOnInit() {
  }

}
