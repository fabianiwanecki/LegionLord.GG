import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {StatisticsFilterService} from "./statistics-filter.service";

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  statsUrl = environment.backendUrl + 'stats';

  constructor(private http: HttpClient, private statisticsFilterService: StatisticsFilterService) {
  }

  getUnitStats(patch: string, elo: string, queueType: string) {
    return this.http.get(this.statsUrl, {params: {type: 'UNITS', patch: patch, elo: elo, queueType: queueType}});
  }

  getOpeningStats(patch: string, elo: string, queueType: string) {
    return this.http.get(this.statsUrl, {params: {type: 'OPENINGS', patch: patch, elo: elo, queueType: queueType}});
  }

  getLegionStats(patch: string, elo: string, queueType: string) {
    return this.http.get(this.statsUrl, {params: {type: 'LEGIONS', patch: patch, elo: elo, queueType: queueType}});
  }

  getLegionSpellsStats(patch: string, elo: string, queueType: string) {
    return this.http.get(this.statsUrl, {params: {type: 'LEGION_SPELLS', patch: patch, elo: elo, queueType: queueType}});
  }

  getGamesCount(patch: string, elo: string, queueType: string) {
    return this.http.get(this.statsUrl, {params: {type: 'GAME_COUNT', patch: patch, elo: elo, queueType: queueType}});
  }

  getUnitPickRateStats(patch: string, elo: string, queueType: string) {
    return this.http.get(this.statsUrl, {params: {type: 'UNIT_PICK_RATE', patch: patch, elo: elo, queueType: queueType}});
  }

  getWaveStats(patch: string, elo: string, queueType: string) {
    return this.http.get(this.statsUrl, {params: {type: 'ENDING_WAVE', patch: patch, elo: elo, queueType: queueType}});
  }

  createUnitObject(csv: any): any {
    return csv.map((entry: any) => entry.split(',')).filter((entry: any) => entry[0] !== '').map((entry: any) => { return {unitName: entry[0], winRate: entry[1]}});
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

  createWaveObject(csv: any) {
    return csv.map((entry: any) => entry.split(',')).map((entry: any) => { return {wave: entry[0], endingRate: entry[1]}});
  }
}
