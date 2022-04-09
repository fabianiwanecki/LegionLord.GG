import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-player-gametype-stats',
  templateUrl: './player-gametype-stats.component.html',
  styleUrls: ['./player-gametype-stats.component.scss']
})
export class PlayerGametypeStatsComponent {

  @Input() playerStats: any;
}
