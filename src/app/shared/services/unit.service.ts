import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {Unit} from "../dtos/unit";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  unitUrl = environment.backendUrl + 'units';

  $units = new BehaviorSubject<Unit[]>([]);

  constructor(private http: HttpClient) {
    this.loadUnits();
  }

  loadUnits(): void {
    this.http.get<Unit[]>(this.unitUrl).subscribe({
      next: (units: Unit[]) => {
        this.$units.next(units);
      }
    });
  }

  getUnitByUnitId(unitId: string) {
    return this.$units.value.find(unit => unit.unitId === unitId);
  }

  getUnitByName(unitName: string) {
    return this.$units.value.find(unit => unit.name === unitName);
  }
}
