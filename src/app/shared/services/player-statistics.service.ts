import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerStatisticsService {


  countFirstWaveSnail(playerMatchHistory: any, playerId: string, limit: number): number {
    return playerMatchHistory
      .slice(0, limit)
      .map((match: any) =>
        match.playersData.find((playerData: any) => playerData.playerId === playerId))
      .map((playerData: any) => {
        return playerData.mercenariesSentPerWave[0]
      })
      .filter((wave1Send: any) => wave1Send.length).length;
  }

  countFirstWaveKing(playerMatchHistory: any, playerId: string, limit: number): number {
    return playerMatchHistory
      .slice(0, limit)
      .map((match: any) =>
        match.playersData.find((playerData: any) => playerData.playerId === playerId))
      .map((playerData: any) => {
        return playerData.kingUpgradesPerWave[0]
      })
      .filter((kingWave1: any) => kingWave1.length).length;

  }

  countFirstWaveSave(playerMatchHistory: any, playerId: string, limit: number): number {
    return limit - (this.countFirstWaveKing(playerMatchHistory, playerId, limit) + this.countFirstWaveSnail(playerMatchHistory, playerId, limit));
  }


  getLegionPicks(playerMatchHistory: any, playerId: string, limit: number) {
    const legionMap = playerMatchHistory
      .slice(0, limit)
      .map((match: any) =>
        match.playersData.find((playerData: any) => playerData.playerId === playerId))
      .map((playerData: any) => playerData.legion)
      .reduce((previousValue: any, currentValue: any) => previousValue.set(currentValue, (previousValue.get(currentValue) || 0) + 1), new Map());
    return [...legionMap.keys()].map((entry: any) => {
      return {label: entry, value: legionMap.get(entry)};
    });
  }

  getRolls(playerMatchHistory: any, playerId: string, limit: number = playerMatchHistory.length) {
    const unitMap = playerMatchHistory
      .slice(0, limit)
      .map((match: any) =>
        match.playersData.find((playerData: any) => playerData.playerId === playerId))
      .map((playerData: any) => playerData.rolls.split(', ')).flat()
      .filter((rolls: string) => rolls !== '')
      .reduce((previousValue: any, currentValue: any) => previousValue.set(currentValue, (previousValue.get(currentValue) || 0) + 1), new Map());
    return [...unitMap.keys()].map((entry: any) => {
      return {label: entry, value: unitMap.get(entry)};
    });
  }

  getOpenings(playerMatchHistory: any, playerId: string, limit: number = playerMatchHistory.length) {
    const unitMap = playerMatchHistory
      .slice(0, limit)
      .map((match: any) =>
        match.playersData.find((playerData: any) => playerData.playerId === playerId))
      .map((playerData: any) => playerData.firstWaveFighters)
      .filter((opening: string) => opening !== '')
      .reduce((previousValue: any, currentValue: any) => previousValue.set(currentValue, (previousValue.get(currentValue) || 0) + 1), new Map());
    return [...unitMap.keys()].map((entry: any) => {
      return {label: entry, value: unitMap.get(entry)};
    });
  }
}
