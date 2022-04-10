import { Injectable } from '@angular/core';
import {getMercenaryByName} from "../game-data/MercenaryData";

@Injectable({
  providedIn: 'root'
})
export class MercenaryService {

  getMercenaryValue(mercenaryNames: string[]) {
    return mercenaryNames?.flat().map(mercenaryName => getMercenaryByName(mercenaryName).cost).reduce(((previousValue, currentValue) => previousValue + currentValue), 0);
  }
}
