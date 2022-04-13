import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {StatsService} from "../../../shared/services/stats.service";
import {getSpellByName} from "../../../shared/game-data/SpellData";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-statistics-legion-spells',
  templateUrl: './statistics-legion-spells.component.html',
  styleUrls: ['./statistics-legion-spells.component.scss']
})
export class StatisticsLegionSpellsComponent implements AfterViewInit {

  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['position', 'legionSpell', 'pickRate', 'winRate'];
  legionCdnUrl = environment.legionCdnUrl;


  constructor(private statsService: StatsService) {
  }

  ngAfterViewInit(): void {
    this.statsService.getLegionSpellsStats().subscribe((units) => this.dataSource.data = this.statsService.createLegionSpellObject(units));
    this.dataSource.sort = this.sort;
  }

  getSpell(spell: string): any {
    return getSpellByName(spell);
  }
}
