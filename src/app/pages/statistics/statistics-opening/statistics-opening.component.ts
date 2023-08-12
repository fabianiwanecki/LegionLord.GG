import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {StatsService} from "../../../shared/services/stats.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {StatisticsFilterService} from "../../../shared/services/statistics-filter.service";
import {UnitService} from "../../../shared/services/unit.service";

@Component({
  selector: 'app-statistics-opening',
  templateUrl: './statistics-opening.component.html',
  styleUrls: ['./statistics-opening.component.scss']
})
export class StatisticsOpeningComponent implements OnInit, OnDestroy {

  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort!: MatSort;
  loadingStats: boolean = true;
  loadingError: boolean = false;

  displayedColumns: string[] = ['position', 'opening', 'pickRate', 'winRate'];
  legionCdnUrl = environment.legionCdnUrl + 'icons/';


  constructor(private statsService: StatsService, private statisticsFilterService: StatisticsFilterService, private unitService: UnitService) {
  }

  ngOnInit(): void {
    this.statisticsFilterService.$selectedElo.subscribe(elo => {
      this.loadingError = false;
      this.loadingStats = true;
      this.dataSource.data = [];
      this.statsService.getOpeningStats(elo, this.statisticsFilterService.selectedQueueType).subscribe({
          next: (units) => {
            this.dataSource.data = units
            this.loadingStats = false;
          },
          error: () => {
            this.loadingError = true;
            this.loadingStats = false;
          }
        }
      );
    });
    this.statisticsFilterService.$selectedQueueType.subscribe(queueType => {
      this.loadingError = false;
      this.loadingStats = true;
      this.dataSource.data = [];
      this.statsService.getOpeningStats(this.statisticsFilterService.selectedElo, queueType).subscribe({
          next: (units) => {
            this.dataSource.data = units
            this.loadingStats = false;
          },
          error: () => {
            this.loadingError = true;
            this.loadingStats = false;
          }
        }
      );
    });
    this.dataSource.sort = this.sort;
  }

  getUnit(unitName: string): any {
    return this.unitService.getUnitByName(unitName);
  }

  ngOnDestroy(): void {
    this.statisticsFilterService.$selectedElo.unsubscribe();
    this.statisticsFilterService.$selectedQueueType.unsubscribe();
  }
}
