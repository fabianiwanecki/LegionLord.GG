import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {getByUnitId, getByUnitName} from "../../../shared/game-data/UnitData";
import {StatsService} from "../../../shared/services/stats.service";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {StatisticsFilterService} from "../../../shared/services/statistics-filter.service";

@Component({
  selector: 'app-statistics-units',
  templateUrl: './statistics-units.component.html',
  styleUrls: ['./statistics-units.component.scss']
})
export class StatisticsUnitsComponent implements AfterViewInit {

  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort!: MatSort;
  unitPickRates: any;
  loadingStats: boolean = true;
  loadingError: boolean = false;

  displayedColumns: string[] = ['position', 'unitName', 'pickRate', 'winRate'];
  legionCdnUrl = environment.legionCdnUrl;


  constructor(private statsService: StatsService, private statisticsFilterService: StatisticsFilterService) {
  }

  ngAfterViewInit() {
    this.statisticsFilterService.$selectedPatch.subscribe(patch => {
      this.loadingError = false;
      this.loadingStats = true;
      this.dataSource.data = [];
      this.statsService.getUnitStats(patch, this.statisticsFilterService.selectedElo).subscribe({
        next: (units) => {
          this.dataSource.data = this.statsService.createUnitObject(units)
          this.loadingStats = false;
        },
        error: () => {
          this.loadingError = true;
          this.loadingStats = false;
        }
      });
      this.statsService.getUnitPickRateStats(patch, this.statisticsFilterService.selectedElo).subscribe({
        next: (units) => {
          this.unitPickRates = this.statsService.createUnitPickRateObject(units)
          this.loadingStats = false;
        },
        error: () => {
          this.loadingError = true;
          this.loadingStats = false;
        }
      });
    });
    this.statisticsFilterService.$selectedElo.subscribe(elo => {
      this.dataSource.data = [];
      this.loadingError = false;
      this.loadingStats = true;
      this.statsService.getUnitStats(this.statisticsFilterService.selectedPatch, elo).subscribe({
        next: (units) => {
          this.dataSource.data = this.statsService.createUnitObject(units)
          this.loadingStats = false;
        },
        error: () => {
          this.loadingError = true;
          this.loadingStats = false;
        }
      });
      this.statsService.getUnitPickRateStats(this.statisticsFilterService.selectedPatch, elo).subscribe({
        next: (units) => {
          this.unitPickRates = this.statsService.createUnitPickRateObject(units)
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
    return getByUnitName(unitName) || null;
  }

  findUnitPickRateByName(unitName: any): any {
    const unit = getByUnitName(unitName);
    if (unit) {
      return this.unitPickRates?.find((unitPickRate: any) => unit.unitId === unitPickRate.unitId ||
        unit.upgradesFrom[0]?.replace('units ', '') === unitPickRate.unitId ||
        getByUnitId(unit.upgradesFrom[0]?.replace('units ', ''))?.upgradesFrom[0]?.replace('units ', '') === unitPickRate.unitId) || {pickRate: 0};
    }
    return {pickRate: 0};
  }
}
