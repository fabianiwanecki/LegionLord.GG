import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {StatsService} from "../../../shared/services/stats.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {StatisticsFilterService} from "../../../shared/services/statistics-filter.service";
import {UnitService} from "../../../shared/services/unit.service";

@Component({
  selector: 'app-statistics-legions',
  templateUrl: './statistics-legions.component.html',
  styleUrls: ['./statistics-legions.component.scss']
})
export class StatisticsLegionsComponent implements OnInit, OnDestroy {

  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort!: MatSort;
  loadingStats: boolean = true;
  loadingError: boolean = false;

  displayedColumns: string[] = ['position', 'legion', 'pickRate', 'winRate'];
  legionCdnUrl = environment.legionCdnUrl + 'icons/Items/';


  constructor(private statsService: StatsService, private statisticsFilterService: StatisticsFilterService, private unitService: UnitService) {
  }

  ngOnInit(): void {
    this.statisticsFilterService.$selectedElo.subscribe(elo => {
      this.loadingError = false;
      this.loadingStats = true;
      this.dataSource.data = [];
      this.statsService.getLegionStats(elo, this.statisticsFilterService.selectedQueueType).subscribe({
        next: (units) => {
          this.dataSource.data = units
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
      this.statsService.getLegionStats(this.statisticsFilterService.selectedElo, queueType).subscribe({
        next: (units) => {
          this.dataSource.data = units
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

  getUnit(unitId: string): any {
    return this.unitService.getUnitByUnitId(unitId);
  }

  ngOnDestroy(): void {
    this.statisticsFilterService.$selectedElo.unsubscribe();
    this.statisticsFilterService.$selectedQueueType.unsubscribe();
  }
}
