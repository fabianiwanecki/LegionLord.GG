import {Component, OnInit} from '@angular/core';
import {PlayerService} from "../../shared/services/player.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-live-game',
  templateUrl: './live-game.component.html',
  styleUrls: ['./live-game.component.scss']
})
export class LiveGameComponent implements OnInit {

  players: any = {};

  constructor(private route: ActivatedRoute,
              private playerService: PlayerService) {
  }

  ngOnInit(): void {
    this.route.snapshot.queryParams['players'].forEach((playerName: string) => {
      this.playerService.searchPlayerByName(playerName).subscribe((player: any) => {
        this.players[playerName] = player;
        this.playerService.getPlayerMatchHistory(player._id, 50).subscribe(matchHistory => this.players[playerName].matchHistory = matchHistory);
        this.playerService.getPlayerStats(player._id).subscribe(stats => this.players[playerName].stats = stats);
      })
    })
  }

  getPlayersAsArray() {
    let arr: any[] = [];
    Object.keys(this.players).forEach((key) =>{
      arr.push(this.players[key])
    });

    return arr.sort((a, b) => {
      return this.route.snapshot.queryParams['players'].indexOf(a.playerName) - this.route.snapshot.queryParams['players'].indexOf(b.playerName)
    });
  }

}
