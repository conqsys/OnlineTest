import { Component, Input } from '@angular/core';
import { StatInfo } from '../../../model/stats/stat-info.model';

@Component({
  moduleId: module.id,
  selector: 'app-stats',
  templateUrl: './stats.component.html'
})
export class StatsComponent {
  @Input()
  stats: Array<StatInfo>;
}
