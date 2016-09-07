import { Component, OnInit } from '@angular/core';
import{CheckBoxComponent} from '../check-box/check-box.component'
import{RadioComponent} from '../radio/radio.component'

@Component({
  moduleId: module.id,
  selector: 'app-question',
  templateUrl: 'question.component.html',
  styleUrls: ['question.component.css'],
  directives: [CheckBoxComponent,RadioComponent]
})
export class QuestionComponent implements OnInit {
  isSingle: boolean;
private newOption:string;
private options:Array<string>;
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
