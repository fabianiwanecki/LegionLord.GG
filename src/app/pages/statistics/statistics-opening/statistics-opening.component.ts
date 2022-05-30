import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {StatsService} from "../../../shared/services/stats.service";
import {getByUnitName} from "../../../shared/game-data/UnitData";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {StatisticsFilterService} from "../../../shared/services/statistics-filter.service";

@Component({
  selector: 'app-statistics-opening',
  templateUrl: './statistics-opening.component.html',
  styleUrls: ['./statistics-opening.component.scss']
})
export class StatisticsOpeningComponent implements AfterViewInit {

  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort!: MatSort;
  loadingStats: boolean = true;
  loadingError: boolean = false;

  displayedColumns: string[] = ['position', 'opening', 'pickRate', 'winRate'];
  legionCdnUrl = environment.legionCdnUrl;


  constructor(private statsService: StatsService, private statisticsFilterService: StatisticsFilterService) {
  }

  ngAfterViewInit(): void {
    this.statisticsFilterService.$selectedPatch.subscribe(patch => {
      this.loadingError = false;
      this.loadingStats = true;
      this.dataSource.data = [];
      this.statsService.getOpeningStats(patch, this.statisticsFilterService.selectedElo).subscribe({
        next: (units) => {
          this.dataSource.data = this.statsService.createOpeningObject(units)
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
      this.statsService.getOpeningStats(this.statisticsFilterService.selectedPatch, elo).subscribe({
          next: (units) => {
            this.dataSource.data = this.statsService.createOpeningObject(units)
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
    return getByUnitName(unitName);
  }
}
