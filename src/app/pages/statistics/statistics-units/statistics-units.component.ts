import {Component, Input} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {getByUnitId} from "../../../shared/game-data/UnitData";

@Component({
  selector: 'app-statistics-units',
  templateUrl: './statistics-units.component.html',
  styleUrls: ['./statistics-units.component.scss']
})
export class StatisticsUnitsComponent {

  @Input() dataSource: any = [
    {
      unitId: 'bounty_hunter_unit_id',
      pickRate: .124,
      buildRate: .207,
      winRate: .514,
    }
  ].flatMap(i => [i, i, i, i, i, i, i, i, i, i]);

  displayedColumns: string[] = ['position', 'unit', 'pickRate', 'buildRate', 'winRate'];
  legionCdnUrl = environment.legionCdnUrl;

  getUnit(unitId: string): any {
    return getByUnitId(unitId);
  }
}
