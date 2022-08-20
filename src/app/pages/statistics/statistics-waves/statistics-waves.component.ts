import {AfterViewInit, Component, ViewChild} from '@angular/core';
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
export class StatisticsWavesComponent implements AfterViewInit {

  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort!: MatSort;
  loadingStats: boolean = true;
  loadingError: boolean = false;

  displayedColumns: string[] = ['wave', 'endingRate'];
  legionCdnUrl = environment.legionCdnUrl;


  constructor(private statsService: StatsService, private statisticsFilterService: StatisticsFilterService) {
  }

  ngAfterViewInit(): void {
    this.statisticsFilterService.$selectedPatch.subscribe(patch => {
      this.loadingError = false;
      this.loadingStats = true;
      this.dataSource.data = [];
      this.statsService.getWaveStats(patch, this.statisticsFilterService.selectedElo, this.statisticsFilterService.selectedQueueType).subscribe({
        next: (waves) => {
          this.dataSource.data = this.statsService.createWaveObject(waves)
          this.loadingStats = false;
        },
        error: () => {
          this.loadingError = true;
          this.loadingStats = false;
        }
      });
    });
    this.statisticsFilterService.$selectedElo.subscribe(elo => {
      this.loadingError = false;
      this.loadingStats = true;
      this.dataSource.data = [];
      this.statsService.getWaveStats(this.statisticsFilterService.selectedPatch, elo, this.statisticsFilterService.selectedQueueType).subscribe({
        next: (waves) => {
          this.dataSource.data = this.statsService.createWaveObject(waves)
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
      this.statsService.getWaveStats(this.statisticsFilterService.selectedPatch, this.statisticsFilterService.selectedElo, queueType).subscribe({
        next: (waves) => {
          this.dataSource.data = this.statsService.createWaveObject(waves)
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
}
