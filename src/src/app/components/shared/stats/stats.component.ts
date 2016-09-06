import { Component, OnInit,Input } from '@angular/core';
import {StatInfoModel} from '../../../model/stats/statinfo';
import {StatinfoComponent} from '../statinfo/statinfo.component'

@Component({
  moduleId: module.id,
  selector: 'app-stats',
  templateUrl: '../stats/stats.component.html'  ,
  directives: [StatinfoComponent]
})
export class StatsComponent implements OnInit {
@Input()
stats:Array<StatInfoModel>

  constructor() {
     
   }

  ngOnInit() {
  }

}
