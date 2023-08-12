import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {StatsService} from "../../../shared/services/stats.service";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {StatisticsFilterService} from "../../../shared/services/statistics-filter.service";
import {UnitService} from "../../../shared/services/unit.service";

@Component({
  selector: 'app-statistics-units',
  templateUrl: './statistics-units.component.html',
  styleUrls: ['./statistics-units.component.scss']
})
export class StatisticsUnitsComponent implements OnInit, OnDestroy {

  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort!: MatSort;
  unitPickRates: any;
  loadingStats: boolean = true;
  loadingError: boolean = false;

  displayedColumns: string[] = ['position', 'unitName', 'winRate'];
  legionCdnUrl = environment.legionCdnUrl + 'icons/';


  constructor(private statsService: StatsService, private statisticsFilterService: StatisticsFilterService, private unitService: UnitService) {
  }

  ngOnInit() {
    this.statisticsFilterService.$selectedElo.subscribe(elo => {
      this.dataSource.data = [];
      this.loadingError = false;
      this.loadingStats = true;
      this.statsService.getUnitStats(elo, this.statisticsFilterService.selectedQueueType).subscribe({
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
      this.dataSource.data = [];
      this.loadingError = false;
      this.loadingStats = true;
      this.statsService.getUnitStats(this.statisticsFilterService.selectedElo, queueType).subscribe({
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

  getUnit(unitName: string): any {
    return this.unitService.getUnitByName(unitName) || null;
  }

  findUnitPickRateByName(unitName: any): any {
    const unit = this.unitService.getUnitByName(unitName);
    if (unit) {
      return this.unitPickRates?.find((unitPickRate: any) => unit.unitId === unitPickRate.unitId ||
        unit.upgradesFrom[0]?.replace('units ', '') === unitPickRate.unitId ||
        this.unitService.getUnitByUnitId(unit.upgradesFrom[0]?.replace('units ', ''))?.upgradesFrom[0]?.replace('units ', '') === unitPickRate.unitId) || {pickRate: 0};
    }
    return {pickRate: 0};
  }

  ngOnDestroy(): void {
    this.statisticsFilterService.$selectedElo.unsubscribe();
    this.statisticsFilterService.$selectedQueueType.unsubscribe();
  }
}
