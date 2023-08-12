import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {
  EndingWaveStatisticsDto,
  FirstWaveFightersStatisticsDto,
  LegionStatisticsDto,
  SpellStatisticsDto,
  UnitStatisticsDto
} from "../dtos/statistics";

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  statsUrl = environment.backendUrl + 'statistics/';
  unitStatsUrl = this.statsUrl + 'units/latest';
  legionsStatsUrl = this.statsUrl + 'legions/latest';
  rollsStatsUrl = this.statsUrl + 'rolls/latest';
  spellsStatsUrl = this.statsUrl + 'spells/latest';
  endingWavesStatsUrl = this.statsUrl + 'ending-waves/latest';
  firstWaveFightersStatsUrl = this.statsUrl + 'first-wave-fighters/latest';
  gameCountUrl = this.statsUrl + 'game-count/latest';


  constructor(private http: HttpClient) {
  }

  getUnitStats(rank: string, gameType: string): Observable<UnitStatisticsDto[]> {
    return this.http.get<UnitStatisticsDto[]>(this.unitStatsUrl, {params: {rank: rank, 'game-type': gameType}});
  }

  getOpeningStats(rank: string, gameType: string): Observable<FirstWaveFightersStatisticsDto[]> {
    return this.http.get<FirstWaveFightersStatisticsDto[]>(this.firstWaveFightersStatsUrl, {params: {rank: rank, 'game-type': gameType}});
  }

  getLegionStats(rank: string, gameType: string): Observable<LegionStatisticsDto[]> {
    return this.http.get<LegionStatisticsDto[]>(this.legionsStatsUrl, {params: {rank: rank, 'game-type': gameType}});
  }

  getLegionSpellsStats(rank: string, gameType: string): Observable<SpellStatisticsDto[]> {
    return this.http.get<SpellStatisticsDto[]>(this.spellsStatsUrl, {params: {rank: rank, 'game-type': gameType}});
  }

  getGamesCount(rank: string, gameType: string): Observable<any> {
    return this.http.get(this.gameCountUrl, {params: {rank: rank, 'game-type': gameType}});
  }

  getUnitPickRateStats(rank: string, gameType: string): Observable<any> {
    return this.http.get(this.statsUrl, {params: {rank: rank, 'game-type': gameType}});
  }

  getWaveStats(rank: string, gameType: string): Observable<EndingWaveStatisticsDto[]> {
    return this.http.get<EndingWaveStatisticsDto[]>(this.endingWavesStatsUrl, {params: {rank: rank, 'game-type': gameType}});
  }
}
