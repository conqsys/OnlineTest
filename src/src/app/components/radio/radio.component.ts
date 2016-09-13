import { Component, OnInit,Input } from '@angular/core';
import {QuestionOptionModel} from '../../model/question/question-option'
@Component({
  moduleId: module.id,
  selector: 'app-radio',
  templateUrl: 'radio.component.html',
  styleUrls: ['radio.component.css']
})
export class RadioComponent implements OnInit {
@Input()model:QuestionOptionModel;
  constructor() { }

  ngOnInit() {
  }
   valueChanged(value) {
    // alert(JSON.stringify(value));
    console.log(value);
  }

}
