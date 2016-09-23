import { Component, Input } from '@angular/core';
import {QuestionOptionModel} from '../../model/question/question-option';
@Component({
  moduleId: module.id,
  selector: 'app-radio',
  templateUrl: 'radio.component.html',
  styleUrls: ['radio.component.css']
})
export class RadioComponent {
  @Input() model: QuestionOptionModel;

  //  valueChanged(value) {
  //   // alert(JSON.stringify(value));
  //   console.log(value);
  // }

}
