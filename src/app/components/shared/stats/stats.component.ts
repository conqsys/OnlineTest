import { Component, Input } from '@angular/core';
import {StatInfoModel} from '../../../model/stats/statinfo';
// import {StatinfoComponent} from '../statinfo/statinfo.component';

@Component({
  moduleId: module.id,
  selector: 'app-stats',
  templateUrl: './stats.component.html'
})
export class StatsComponent {
  @Input()
  stats: Array<StatInfoModel>;
}
