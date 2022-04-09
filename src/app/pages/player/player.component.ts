import {Component, OnInit} from '@angular/core';
import {PlayerService} from "../../shared/services/player.service";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  playerStats: any;
  playerMatchHistory: any[] = [];
  player: any;
  legionCdnUrl = environment.legionCdnUrl;

  initialPageSize = 20;

  isMatchHistoryLoading = false;
  isLoadNewPlayer = true;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private playerService: PlayerService) {
  }

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData() {
    this.isMatchHistoryLoading = true;
    const currentPlayerId = <string>this.route.snapshot.paramMap.get('id');
    this.playerService.getPlayerStats(currentPlayerId).subscribe(playerStats => this.playerStats = playerStats);
    this.playerService.getPlayerById(currentPlayerId).subscribe(player => this.player = player)
    this.getMatchHistory();
  }

  getMatchHistory() {
    this.playerService.getPlayerMatchHistory(<string>this.route.snapshot.paramMap.get('id'), this.initialPageSize).subscribe(
      {
        next: (playerMatchHistory) => {
          this.playerMatchHistory = playerMatchHistory;
          this.isMatchHistoryLoading = false;
          this.isLoadNewPlayer = false;
        },
        error: () => {
          this.isMatchHistoryLoading = false;
          this.isLoadNewPlayer = false;
        },
      });
  }
}
