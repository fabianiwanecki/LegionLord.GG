import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {StatsService} from "../../../shared/services/stats.service";
import {getSpellByName} from "../../../shared/game-data/SpellData";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {StatisticsFilterService} from "../../../shared/services/statistics-filter.service";

@Component({
  selector: 'app-statistics-legion-spells',
  templateUrl: './statistics-legion-spells.component.html',
  styleUrls: ['./statistics-legion-spells.component.scss']
})
export class StatisticsLegionSpellsComponent implements AfterViewInit {

  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort!: MatSort;
  loadingStats: boolean = true;
  loadingError: boolean = false;

  displayedColumns: string[] = ['position', 'legionSpell', 'pickRate', 'winRate'];
  legionCdnUrl = environment.legionCdnUrl;


  constructor(private statsService: StatsService, private statisticsFilterService: StatisticsFilterService) {
  }

  ngAfterViewInit(): void {
    this.statisticsFilterService.$selectedPatch.subscribe(patch => {
      this.loadingError = false;
      this.loadingStats = true;
      this.dataSource.data = [];
      this.statsService.getLegionSpellsStats(patch, this.statisticsFilterService.selectedElo, this.statisticsFilterService.selectedQueueType).subscribe({
        next: (units) => {
          this.dataSource.data = this.statsService.createLegionSpellObject(units)
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
      this.statsService.getLegionSpellsStats(this.statisticsFilterService.selectedPatch, elo, this.statisticsFilterService.selectedQueueType).subscribe({
        next: (units) => {
          this.dataSource.data = this.statsService.createLegionSpellObject(units)
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
      this.statsService.getLegionSpellsStats(this.statisticsFilterService.selectedPatch, this.statisticsFilterService.selectedElo, queueType).subscribe({
        next: (units) => {
          this.dataSource.data = this.statsService.createLegionSpellObject(units)
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

  getSpell(spell: string): any {
    return getSpellByName(spell);
  }
}
