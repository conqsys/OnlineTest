import { Component, OnInit } from '@angular/core';
import{CheckBoxComponent} from '../../check-box/check-box.component'
import{RadioComponent} from '../../radio/radio.component'
import {FroalaEditorCompnoent} from "ng2-froala-editor/ng2-froala-editor";
@Component({
  moduleId: module.id,
  selector: 'app-question',
  templateUrl: 'question.component.html',
  styleUrls: ['question.component.css'],
  directives: [CheckBoxComponent,RadioComponent,FroalaEditorCompnoent]
})
export class QuestionComponent implements OnInit {
  isSingle: boolean;
private newOption:string;
private options:Array<string>;
text: string = '<div>Hey we are testing Froala Editor</div>';
  editor: any;
 
  froalaOptions: any = {
    height: 300
  };
 
  constructor() {
    this.options=new Array<string>();
    this.options.push("first option");
    this.options.push("second option");
    this.options.push("third option");
    this.newOption="";
    this.isSingle = true;
  }
  valueChanged(value) {
    this.isSingle = !this.isSingle;
  }
  onFroalaModelChanged(event: any) {
    setTimeout(() => {
      this.text = event;
    });
  }
 onEditorInitialized(event?: any) {
   alert("success");
    this.editor = FroalaEditorCompnoent.getFroalaInstance();
    this.editor.on('froalaEditor.focus', (e, editor) => {
      console.log("editor is focused");
    });
  }
  addOption() {
    if(this.newOption==="")
    alert("can not be blank");
    else
    this.options.push(this.newOption);
    this.newOption="";
   
  }
  ngOnInit() {
    
  }

}
