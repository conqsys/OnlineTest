import { Component, OnInit,Input } from '@angular/core';
import {QuestionOptionModel} from '../../model/question/question-option'

@Component({
  moduleId: module.id,
  selector: 'app-check-box',
  templateUrl: 'check-box.component.html',
  styleUrls: ['check-box.component.css']
})
export class CheckBoxComponent implements OnInit {
  @Input()model:QuestionOptionModel;
 private firstName = "";
  private selectedOption = "";

  constructor() { }

  ngOnInit() {
    
  }

}
