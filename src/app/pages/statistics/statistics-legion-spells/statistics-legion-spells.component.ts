import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
export class StatisticsLegionSpellsComponent implements OnInit, OnDestroy {

  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort!: MatSort;
  loadingStats: boolean = true;
  loadingError: boolean = false;

  displayedColumns: string[] = ['position', 'legionSpell', 'pickRate', 'winRate'];
  legionCdnUrl = environment.legionCdnUrl + 'icons/';


  constructor(private statsService: StatsService, private statisticsFilterService: StatisticsFilterService) {
  }

  ngOnInit(): void {
    this.statisticsFilterService.$selectedElo.subscribe(elo => {
      this.loadingError = false;
      this.loadingStats = true;
      this.dataSource.data = [];
      this.statsService.getLegionSpellsStats(elo, this.statisticsFilterService.selectedQueueType).subscribe({
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
      this.statsService.getLegionSpellsStats(this.statisticsFilterService.selectedElo, queueType).subscribe({
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

  getSpell(spell: string): any {
    return getSpellByName(spell);
  }

  transformSpellName(spell: string) {
      return spell
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
  }

  ngOnDestroy(): void {
    this.statisticsFilterService.$selectedElo.unsubscribe();
    this.statisticsFilterService.$selectedQueueType.unsubscribe();
  }
}
