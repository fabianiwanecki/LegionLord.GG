import {Component, OnInit} from '@angular/core';
import {PlayerService} from "../../shared/services/player.service";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {LiveGameService} from "../../shared/services/live-game.service";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  playerStats: any;
  playerMatchHistory: any[] = [];
  player: any;
  liveGame: any;
  legionCdnUrl = environment.legionCdnUrl;

  initialPageSize = 20;

  isMatchHistoryLoading = false;
  isLoadNewPlayer = true;
  isLoadLiveGame = true;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private playerService: PlayerService,
              private liveGameService: LiveGameService) {
  }

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData() {
    this.isMatchHistoryLoading = true;
    const currentPlayerName = <string>this.route.snapshot.paramMap.get('id');

    this.playerService.searchPlayerByName(currentPlayerName).subscribe({
      next: (playerByName: any) => {
        this.playerService.getPlayerStats(playerByName._id).subscribe(playerStats => this.playerStats = playerStats);
        this.playerService.getPlayerById(playerByName._id).subscribe(player => {
          this.player = player;
          this.liveGameService.getLiveGameByPlayerName(this.player.playerName).subscribe(
            {
              next: (liveGame) => {
                this.isLoadLiveGame = false;
                this.liveGame = liveGame;
              },
              error: () => {
                this.isLoadLiveGame = false;
                console.log("Live game search timed out. Probably the player is not in a game currently")
              },
            })
          this.getMatchHistory();
        })
      }
    });
  }

  getMatchHistory() {
    this.playerService.getPlayerMatchHistory(this.player._id, this.initialPageSize).subscribe(
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
