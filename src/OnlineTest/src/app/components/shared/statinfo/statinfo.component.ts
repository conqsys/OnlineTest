import { Component, OnInit,Input } from '@angular/core';
import {StatInfoModel} from '../../../model/stats/statinfo';


@Component({
  moduleId: module.id,
  selector: 'app-statinfo',
  templateUrl: '../statinfo/statinfo.component.html',
})
export class StatinfoComponent implements OnInit {
@Input()
statInfo:StatInfoModel

  constructor() {
     
   }

  ngOnInit() {
  }

}
