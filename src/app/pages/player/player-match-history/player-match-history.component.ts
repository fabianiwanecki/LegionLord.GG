import {Component, Input} from '@angular/core';
import {PlayerService} from "../../../shared/services/player.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-player-match-history',
  templateUrl: './player-match-history.component.html',
  styleUrls: ['./player-match-history.component.scss']
})
export class PlayerMatchHistoryComponent {

  @Input() playerMatchHistory: any;
  @Input() player: any;
  @Input() isMatchHistoryLoading: boolean = false;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  pageSize = 10;

  constructor(private route: ActivatedRoute,
              private playerService: PlayerService) {
  }

  onScrollDown() {
    if (!this.isMatchHistoryLoading) {
      this.appendMatches();
    }
  }

  private appendMatches() {
    this.isMatchHistoryLoading = true;
    this.playerService.getPlayerMatchHistory(this.player?._id, this.pageSize, this.playerMatchHistory.length).subscribe((playerMatchHistory: any) => {
      this.playerMatchHistory = this.playerMatchHistory.concat(playerMatchHistory);
      this.isMatchHistoryLoading = false;
    });
  }
}
