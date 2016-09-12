import { Component, OnInit,Input } from '@angular/core';
import {QuestionOptionModel} from '../../model/question/questionOption'
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

}
