import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {environment} from "../../../../environments/environment";
import {StatsService} from "../../../shared/services/stats.service";
import {getWaveByLevelNum} from "../../../shared/game-data/WaveData";

@Component({
  selector: 'app-statistics-waves',
  templateUrl: './statistics-waves.component.html',
  styleUrls: ['./statistics-waves.component.scss']
})
export class StatisticsWavesComponent implements AfterViewInit {

  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['wave', 'endingRate'];
  legionCdnUrl = environment.legionCdnUrl;


  constructor(private statsService: StatsService) {
  }

  ngAfterViewInit(): void {
    this.statsService.getWaveStats().subscribe((waves) => this.dataSource.data = this.statsService.createWaveObject(waves));
    this.dataSource.sort = this.sort;
  }

  getWave(wave: number) {
    return getWaveByLevelNum(wave) || '';
  }
}
