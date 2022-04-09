import {Component, OnInit} from '@angular/core';
import {PlayerService} from "../../shared/services/player.service";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {retry} from "rxjs";

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

  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  pageSize = 10;
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

  onScrollDown() {
    if (!this.isMatchHistoryLoading) {
      this.appendMatches();
    }
  }

  private appendMatches() {
    this.isMatchHistoryLoading = true;
    this.playerService.getPlayerMatchHistory(<string>this.route.snapshot.paramMap.get('id'), this.pageSize, this.playerMatchHistory.length).pipe(retry(3)).subscribe((playerMatchHistory: any) => {
      this.playerMatchHistory = this.playerMatchHistory.concat(playerMatchHistory);
      this.isMatchHistoryLoading = false;
    });
  }

  countFirstWaveSnail(): number {
    return this.playerMatchHistory
      .slice(0, this.initialPageSize)
      .map((match: any) =>
        match.playersData.find((playerData: any) => playerData.playerId === this.route.snapshot.paramMap.get('id')))
      .map((playerData: any) => {
        return playerData.mercenariesSentPerWave[0]
      })
      .filter((wave1Send: any) => wave1Send.length).length;
  }

  countFirstWaveKing(): number {
    return this.playerMatchHistory
      .slice(0, this.initialPageSize)
      .map((match: any) =>
        match.playersData.find((playerData: any) => playerData.playerId === this.route.snapshot.paramMap.get('id')))
      .map((playerData: any) => {
        return playerData.kingUpgradesPerWave[0]
      })
      .filter((kingWave1: any) => kingWave1.length).length;

  }

  countFirstWaveSave(): number {
    return this.initialPageSize - (this.countFirstWaveKing() + this.countFirstWaveSnail());
  }

  getLegionData() {
    const legionMap = this.playerMatchHistory
      .slice(0, this.initialPageSize)
      .map((match: any) =>
        match.playersData.find((playerData: any) => playerData.playerId === this.route.snapshot.paramMap.get('id')))
      .map((playerData: any) => playerData.legion)
      .reduce((previousValue, currentValue) => previousValue.set(currentValue, (previousValue.get(currentValue) || 0) + 1), new Map());
    return [...legionMap.keys()].map((entry: any) => {
      return {label: entry, value: legionMap.get(entry)};
    });
  }
}
