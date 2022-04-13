import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {StatsService} from "../../../shared/services/stats.service";
import {getByUnitName} from "../../../shared/game-data/UnitData";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-statistics-opening',
  templateUrl: './statistics-opening.component.html',
  styleUrls: ['./statistics-opening.component.scss']
})
export class StatisticsOpeningComponent implements AfterViewInit {

  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['position', 'opening', 'pickRate', 'winRate'];
  legionCdnUrl = environment.legionCdnUrl;


  constructor(private statsService: StatsService) {
  }

  ngAfterViewInit(): void {
    this.statsService.getOpeningStats().subscribe((units) => this.dataSource.data = this.statsService.createOpeningObject(units));
    this.dataSource.sort = this.sort;
  }

  getUnit(unitName: string): any {
    return getByUnitName(unitName);
  }
}
