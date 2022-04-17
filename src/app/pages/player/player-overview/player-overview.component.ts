import {Component, Input} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {getByElo} from "../../../shared/game-data/RatingData";
import {Router} from "@angular/router";

@Component({
  selector: 'app-player-overview',
  templateUrl: './player-overview.component.html',
  styleUrls: ['./player-overview.component.scss']
})
export class PlayerOverviewComponent {

  @Input() player: any;
  @Input() playerStats: any;
  @Input() liveGame: any;
  legionCdnUrl = environment.legionCdnUrl;


  constructor(private router: Router) {
  }

  getEloIcon(rating: number): string {
    return getByElo(rating).icon;
  }

  navigateToLiveGame() {
    const url = '/live-game/' + this.player.playerName
    const liveGamePlayers = this.liveGame.message.split('\r\n').slice(1).map((playerAndElo: string) => playerAndElo.split(':')[0]);
    this.router.navigate([url], {queryParams: {players: liveGamePlayers}});
  }
}
