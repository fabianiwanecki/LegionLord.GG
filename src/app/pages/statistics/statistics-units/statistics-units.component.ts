import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {getByUnitId, getByUnitName} from "../../../shared/game-data/UnitData";
import {StatsService} from "../../../shared/services/stats.service";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-statistics-units',
  templateUrl: './statistics-units.component.html',
  styleUrls: ['./statistics-units.component.scss']
})
export class StatisticsUnitsComponent implements AfterViewInit{

  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort!: MatSort;
  unitPickRates: any;

  displayedColumns: string[] = ['position', 'unitName', 'pickRate', 'winRate'];
  legionCdnUrl = environment.legionCdnUrl;


  constructor(private statsService: StatsService) {
  }

  ngAfterViewInit() {
    this.statsService.getUnitStats().subscribe((units) => this.dataSource.data = this.statsService.createUnitObject(units));
    this.statsService.getUnitPickRateStats().subscribe((units) => this.unitPickRates = this.statsService.createUnitPickRateObject(units));
    this.dataSource.sort = this.sort;
  }

  getUnit(unitName: string): any {
    return getByUnitName(unitName) || null;
  }

  findUnitPickRateByName(unitName: any): any {
    const unit = getByUnitName(unitName) || null;
    return this.unitPickRates?.find((unitPickRate: any) => unit.unitId === unitPickRate.unitId ||
      unit.upgradesFrom[0]?.replace('units ', '') === unitPickRate.unitId ||
    getByUnitId(unit.upgradesFrom[0]?.replace('units ', ''))?.upgradesFrom[0]?.replace('units ', '') === unitPickRate.unitId) || {pickRate: 0};
  }
}