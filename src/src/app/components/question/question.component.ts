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

  constructor() {
    this.isSingle = true;
  }
  valueChanged(value) {
    this.isSingle = !this.isSingle;
  }
  ngOnInit() {
  }

}
