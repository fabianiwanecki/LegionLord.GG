import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PlayerStatisticsService} from "../../../shared/services/player-statistics.service";

@Component({
  selector: 'app-player-statistics',
  templateUrl: './player-statistics.component.html',
  styleUrls: ['./player-statistics.component.scss']
})
export class PlayerStatisticsComponent implements OnInit {

  @Input() playerMatchHistory: any;
  @Input() initialPageSize!: number;
  @Input() player: any;

  constructor(private route: ActivatedRoute,
              public playerStatisticsService: PlayerStatisticsService) {
  }

  ngOnInit(): void {
  }

  firstWaveTendencyData() {
    return [
      {
        label: 'Snail',
        value: this.playerStatisticsService.countFirstWaveSnail(this.playerMatchHistory, this.player?._id, this.initialPageSize) / this.initialPageSize
      },
      {
        label: 'King',
        value: this.playerStatisticsService.countFirstWaveKing(this.playerMatchHistory, this.player?._id, this.initialPageSize) / this.initialPageSize
      },
      {
        label: 'Save',
        value: this.playerStatisticsService.countFirstWaveSave(this.playerMatchHistory, this.player?._id, this.initialPageSize) / this.initialPageSize
      }
    ]
  }
}
