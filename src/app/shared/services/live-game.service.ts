import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LiveGameService {

  liveGameUrl = environment.backendUrl + 'live-game/';


  constructor(private http: HttpClient) {
  }

  getLiveGameByPlayerName(playerName: string) {
    return this.http.get(this.liveGameUrl + playerName);
  }
}
