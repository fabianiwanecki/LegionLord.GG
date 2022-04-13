import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  statsUrl = environment.backendUrl + 'stats';

  constructor(private http: HttpClient) {
  }

  getUnitStats() {
    return this.http.get(this.statsUrl, {params: {type: 'UNITS'}});
  }

  getOpeningStats() {
    return this.http.get(this.statsUrl, {params: {type: 'OPENINGS'}});
  }

  getLegionStats() {
    return this.http.get(this.statsUrl, {params: {type: 'LEGIONS'}});
  }

  getLegionSpellsStats() {
    return this.http.get(this.statsUrl, {params: {type: 'LEGION_SPELLS'}});
  }

  createUnitObject(csv: any): any {
    return csv.map((entry: any) => entry.split(',')).map((entry: any) => { return {unitName: entry[0], buildRate: entry[1], winRate: entry[2]}});
  }

  createUnitPickRateObject(csv: any): any {
    return csv.map((entry: any) => entry.split(',')).map((entry: any) => { return {unitId: entry[0], pickRate: entry[1]}});
  }

  createLegionObject(csv: any): any {
    return csv.map((entry: any) => entry.split(',')).map((entry: any) => { return {legion: entry[0], buildRate: entry[1], pickRate: entry[1], winRate: entry[2]}});
  }

  createLegionSpellObject(csv: any): any {
    return csv.map((entry: any) => entry.split(',')).map((entry: any) => { return {legionSpell: entry[0], pickRate: entry[1], winRate: entry[3]}});
  }

  createOpeningObject(csv: any): any {
    return csv
      .map((entry: any) => [entry.substring(0, entry.lastIndexOf(',')), entry.substring(entry.lastIndexOf(',')+1)])
      .map((entry: any) => [entry[0].substring(0, entry[0].lastIndexOf(',')), entry[0].substring(entry[0].lastIndexOf(',')+1), entry[1]])
      .map((entry: any) => { return {unitNames: entry[0], pickRate: entry[1], winRate: entry[2]}});
  }

  getGamesCount() {
    return this.http.get(this.statsUrl, {params: {type: 'GAME_COUNT'}});
  }

  getUnitPickRateStats() {
    return this.http.get(this.statsUrl, {params: {type: 'UNIT_PICK_RATE'}});
  }
}
