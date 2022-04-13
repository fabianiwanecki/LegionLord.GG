import {Component} from '@angular/core';
import {StatsService} from "../../shared/services/stats.service";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {

  gamesCount: number = 0;

  constructor(private statsService: StatsService) {
  }

  ngOnInit(): void {
    this.statsService.getGamesCount().subscribe((gamesCount: any) => this.gamesCount = gamesCount[0])
  }

}
