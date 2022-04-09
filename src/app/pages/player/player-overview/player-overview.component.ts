import {Component, Input} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {getByElo} from "../../../shared/game-data/RatingData";

@Component({
  selector: 'app-player-overview',
  templateUrl: './player-overview.component.html',
  styleUrls: ['./player-overview.component.scss']
})
export class PlayerOverviewComponent {

  @Input() player: any;
  @Input() playerStats: any;
  legionCdnUrl = environment.legionCdnUrl;

  getEloIcon(rating: number): string {
    return getByElo(rating).icon;
  }

}
