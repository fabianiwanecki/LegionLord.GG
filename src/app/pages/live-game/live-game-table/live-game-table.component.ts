import {Component, Input} from '@angular/core';
import {PlayerStatisticsService} from "../../../shared/services/player-statistics.service";
import {environment} from "../../../../environments/environment";
import {getByElo} from "../../../shared/game-data/RatingData";
import {UnitService} from "../../../shared/services/unit.service";

@Component({
  selector: 'app-live-game-table',
  templateUrl: './live-game-table.component.html',
  styleUrls: ['./live-game-table.component.scss']
})
export class LiveGameTableComponent {

  @Input() dataSource: any;
  displayedColumns: string[] = ['icon', 'name', 'rank', 'winRate', 'firstWave', 'legion', 'rolls', 'openings'];
  legionCdnUrl = environment.legionCdnUrl;
  constructor(public playerStatsService: PlayerStatisticsService, private unitService: UnitService) { }

  getLegionPicksSorted(player: any) {
    return this.playerStatsService.getLegionPicks(player.matchHistory, player._id, 20).sort((a, b) => b.value - a.value).slice(0, 3);
  }

  getRollsSorted(player: any) {
    return this.playerStatsService.getRolls(player.matchHistory, player._id).sort((a, b) => b.value - a.value).slice(0, 6);
  }

  getUnitIconPath(label: string) {
    return this.legionCdnUrl + this.unitService.getUnitByUnitId(label)?.iconPath;
  }

  getOpeningsSorted(player: any) {
    return this.playerStatsService.getOpenings(player.matchHistory, player._id).sort((a, b) => b.value - a.value).slice(0, 6);
  }

  getUnitIconPathByName(label: any) {
    return this.legionCdnUrl + this.unitService.getUnitByName(label)?.iconPath;
  }

  splitComma(opening: string) {
    return opening.split(',');
  }

  getEloIcon(rating: number): string {
    return getByElo(rating).icon;
  }
}
