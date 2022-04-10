import {Component, Input} from '@angular/core';
import {getMercenaryByName} from "../../../../../shared/game-data/MercenaryData";
import {getKingUpgradeByName} from "../../../../../shared/game-data/KingUpgradeData";

@Component({
  selector: 'app-match-builds',
  templateUrl: './match-builds.component.html',
  styleUrls: ['./match-builds.component.scss']
})
export class MatchBuildsComponent {

  @Input() entry: any;

  selectedWave: number = 0;

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
}
