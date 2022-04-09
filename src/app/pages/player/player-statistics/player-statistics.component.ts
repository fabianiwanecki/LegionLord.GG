import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PlayerStatisticsService} from "../../../shared/services/player-statistics.service";

@Component({
  selector: 'app-player-statistics',
  templateUrl: './player-statistics.component.html',
  styleUrls: ['./player-statistics.component.scss']
})
export class PlayerStatisticsComponent implements OnInit {

  @Input() playerMatchHistory?: any;
  @Input() initialPageSize!: number;

  playerId: string = "";

  constructor(private route: ActivatedRoute,
              public playerStatisticsService: PlayerStatisticsService) {
  }

  ngOnInit(): void {
    this.playerId = <string>this.route.snapshot.paramMap.get('id');
  }

  firstWaveTendencyData() {
    return [
      {
        label: 'Snail',
        value: this.playerStatisticsService.countFirstWaveSnail(this.playerMatchHistory, this.playerId, this.initialPageSize) / this.initialPageSize
      },
      {
        label: 'King',
        value: this.playerStatisticsService.countFirstWaveKing(this.playerMatchHistory, this.playerId, this.initialPageSize) / this.initialPageSize
      },
      {
        label: 'Save',
        value: this.playerStatisticsService.countFirstWaveSave(this.playerMatchHistory, this.playerId, this.initialPageSize) / this.initialPageSize
      }
    ]
  }
}
