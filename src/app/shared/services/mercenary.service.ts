import {Injectable} from '@angular/core';
import {UnitService} from "./unit.service";

@Injectable({
  providedIn: 'root'
})
export class MercenaryService {
  constructor(private unitService: UnitService) {
  }

  getMercenaryValue(mercenaryNames: string[]) {
    return mercenaryNames?.flat().map(mercenaryName => this.unitService.getUnitByName(mercenaryName)?.cost || 0).reduce(((previousValue, currentValue) => previousValue + currentValue), 0);
  }
}
