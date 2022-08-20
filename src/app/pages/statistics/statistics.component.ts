import {Component} from '@angular/core';
import {StatsService} from "../../shared/services/stats.service";
import {StatisticsFilterService} from "../../shared/services/statistics-filter.service";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {

  gamesCount: number = 0;

  constructor(private statsService: StatsService, private statisticsFilterService: StatisticsFilterService) {
  }

  ngOnInit(): void {
    this.statisticsFilterService.$selectedPatch.subscribe(patch => {
      this.gamesCount = 0;
      this.statsService.getGamesCount(patch, this.statisticsFilterService.selectedElo, this.statisticsFilterService.selectedQueueType).subscribe((gamesCount: any) => this.gamesCount = gamesCount[0])
    });
    this.statisticsFilterService.$selectedElo.subscribe(elo => {
      this.gamesCount = 0;
      this.statsService.getGamesCount(this.statisticsFilterService.selectedPatch, elo, this.statisticsFilterService.selectedQueueType).subscribe((gamesCount: any) => this.gamesCount = gamesCount[0])
    });
    this.statisticsFilterService.$selectedQueueType.subscribe(queueType => {
      this.gamesCount = 0;
      this.statsService.getGamesCount(this.statisticsFilterService.selectedPatch, this.statisticsFilterService.selectedElo, queueType).subscribe((gamesCount: any) => this.gamesCount = gamesCount[0])
    });
  }

}
