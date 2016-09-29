import { Component, Input } from '@angular/core';
import {StatInfoModel} from '../../../model/stats/statinfo';


@Component({
  moduleId: module.id,
  selector: 'app-statinfo',
  templateUrl: '../statinfo/statinfo.component.html',
})
export class StatinfoComponent {
  @Input()
  statInfo: StatInfoModel;
  constructor(){
    
  }
}
