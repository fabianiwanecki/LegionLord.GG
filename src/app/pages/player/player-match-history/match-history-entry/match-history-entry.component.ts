import {Component, Input} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {ActivatedRoute} from "@angular/router";
import {getMercenaryByName} from "../../../../shared/game-data/MercenaryData";
import {getKingUpgradeByName} from "../../../../shared/game-data/KingUpgradeData";
import {getSpellByName} from "../../../../shared/game-data/SpellData";

@Component({
  selector: 'app-match-history-entry',
  templateUrl: './match-history-entry.component.html',
  styleUrls: ['./match-history-entry.component.scss']
})
export class MatchHistoryEntryComponent {

  @Input() entry: any;
  legionCdnUrl = environment.legionCdnUrl;
  playersData: any[] = [];
  panelOpenState = false;

  displayedColumns: string[] = ['result', 'name', 'opening', 'fighters', 'leaks', 'workers', 'income', 'sent', 'received', 'spell', 'legion'];
  selectedWave: number = 0;

  constructor(private route: ActivatedRoute) {
  }

  getPlayer() {
    return this.entry?.playersData.filter((playerData: any) => playerData.playerId === this.route.snapshot.paramMap.get('id'))[0];
  }

  getWavesLeakedCount(leaksPerWave: any) {
    return leaksPerWave?.filter((leaks: any) => leaks.length !== 0).length;
  }

  getMercenaryValue(merenaries: any[]) {
    return merenaries?.flat().map(mercenary => getMercenaryByName(mercenary).cost).reduce(((previousValue, currentValue) => previousValue + currentValue), 0);
  }

  floor(number: number) {
    return Math.floor(number);
  }

  changeSelectedWave($event: KeyboardEvent) {
    if ($event.key === 'ArrowRight') {
      this.selectedWave = Math.min(this.entry.endingWave - 1, this.selectedWave + 1);
    }
    if ($event.key === 'ArrowLeft') {
      this.selectedWave = Math.max(0, this.selectedWave - 1);
    }
  }

  getMercenaryIcon(mercenaryName: string) {
    return 'assets/mercenaries/' + getMercenaryByName(mercenaryName).icon
  }

  getKingUpgradeIcon(kingUpgrade: any) {
    return 'assets/king/' + getKingUpgradeByName(kingUpgrade).icon
  }

  getSpellIcon(name: string) {
    return this.legionCdnUrl + getSpellByName(name)?.iconPath;
  }
}
