import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {environment} from "../../../../environments/environment";
import {StatsService} from "../../../shared/services/stats.service";
import {getWaveByLevelNum} from "../../../shared/game-data/WaveData";
import {StatisticsFilterService} from "../../../shared/services/statistics-filter.service";

@Component({
  selector: 'app-statistics-waves',
  templateUrl: './statistics-waves.component.html',
  styleUrls: ['./statistics-waves.component.scss']
})
export class StatisticsWavesComponent implements OnInit, OnDestroy {

  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort!: MatSort;
  loadingStats: boolean = true;
  loadingError: boolean = false;

  displayedColumns: string[] = ['number', 'wave', 'endingRate'];
  legionCdnUrl = environment.legionCdnUrl;


  constructor(private statsService: StatsService, private statisticsFilterService: StatisticsFilterService) {
  }

  ngOnInit(): void {
    this.statisticsFilterService.$selectedElo.subscribe(elo => {
      this.loadingError = false;
      this.loadingStats = true;
      this.dataSource.data = [];
      this.statsService.getWaveStats(elo, this.statisticsFilterService.selectedQueueType).subscribe({
        next: (waves) => {
          this.dataSource.data = waves
          this.loadingStats = false;
        },
        error: () => {
          this.loadingError = true;
          this.loadingStats = false;
        }
      });
    });
    this.statisticsFilterService.$selectedQueueType.subscribe(queueType => {
      this.loadingError = false;
      this.loadingStats = true;
      this.dataSource.data = [];
      this.statsService.getWaveStats(this.statisticsFilterService.selectedElo, queueType).subscribe({
        next: (waves) => {
          this.dataSource.data = waves
          this.loadingStats = false;
        },
        error: () => {
          this.loadingError = true;
          this.loadingStats = false;
        }
      });
    });
    this.dataSource.sort = this.sort;
  }

  getWave(wave: number) {
    return getWaveByLevelNum(wave) || '';
  }

  ngOnDestroy(): void {
    this.statisticsFilterService.$selectedElo.unsubscribe();
    this.statisticsFilterService.$selectedQueueType.unsubscribe();
  }
}
