import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {StatsService} from "../../../shared/services/stats.service";
import {getByUnitId} from "../../../shared/game-data/UnitData";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {StatisticsFilterService} from "../../../shared/services/statistics-filter.service";

@Component({
  selector: 'app-statistics-legions',
  templateUrl: './statistics-legions.component.html',
  styleUrls: ['./statistics-legions.component.scss']
})
export class StatisticsLegionsComponent implements AfterViewInit {

  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort!: MatSort;
  loadingStats: boolean = true;

  displayedColumns: string[] = ['position', 'legion', 'pickRate', 'winRate'];
  legionCdnUrl = environment.legionCdnUrl;


  constructor(private statsService: StatsService, private statisticsFilterService: StatisticsFilterService) {
  }

  ngAfterViewInit(): void {
    this.statisticsFilterService.$selectedPatch.subscribe(patch => {
      this.loadingStats = true;
      this.statsService.getLegionStats(patch).subscribe((units) => {
        this.dataSource.data = this.statsService.createLegionObject(units)
        this.loadingStats = false;
      });
    });
    this.dataSource.sort = this.sort;
  }

  getUnit(unitId: string): any {
    return getByUnitId(unitId);
  }
}
