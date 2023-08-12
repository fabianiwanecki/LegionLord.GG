import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  playerUrl = environment.backendUrl + 'players/';
  searchPlayerUrl = this.playerUrl + 'by-name';
  statsEndpoint = '/stats';
  matchHistoryEndpoint = '/match-history?';

  constructor(private http: HttpClient) {
  }

  searchPlayerByName(playerName: string) {

    return this.http.get(this.searchPlayerUrl, {params: {name: playerName}});
  }

  getPlayerById(id: string) {
    return this.http.get(this.playerUrl + id);
  }

  getPlayerStats(id: string) {
    return this.http.get(this.playerUrl + id + this.statsEndpoint);
  }

  getPlayerMatchHistory(id: string, limit: number = 10, offset: number = 0) {
    return this.http.get<any>(this.playerUrl + id + this.matchHistoryEndpoint, {params: {limit: limit, offset: offset}})
  }
}
