import {Component, Input} from '@angular/core';
import {getKingUpgradeByName} from "../../../../../shared/game-data/KingUpgradeData";
import {UnitService} from "../../../../../shared/services/unit.service";
import {environment} from "../../../../../../environments/environment";

@Component({
  selector: 'app-match-builds',
  templateUrl: './match-builds.component.html',
  styleUrls: ['./match-builds.component.scss']
})
export class MatchBuildsComponent {

  @Input() entry: any;

  selectedWave: number = 0;

  constructor(private unitService: UnitService) {
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
    return environment.legionCdnUrl + this.unitService.getUnitByName(mercenaryName)?.iconPath
  }

  getKingUpgradeIcon(kingUpgrade: any) {
    return 'assets/king/' + getKingUpgradeByName(kingUpgrade).icon
  }
}
