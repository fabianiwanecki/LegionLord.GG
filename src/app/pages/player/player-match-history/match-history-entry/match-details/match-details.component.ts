import {Component, Input} from '@angular/core';
import {MercenaryService} from "../../../../../shared/services/mercenary.service";
import {getSpellByName} from "../../../../../shared/game-data/SpellData";
import {environment} from "../../../../../../environments/environment";

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.scss']
})
export class MatchDetailsComponent {

  @Input() entry: any;

  displayedColumns: string[] = ['result', 'name', 'opening', 'fighters', 'leaks', 'workers', 'income', 'sent', 'received', 'spell', 'legion'];
  legionCdnUrl = environment.legionCdnUrl;

  constructor(public mercenaryService: MercenaryService) {
  }

  getWavesLeakedCount(leaksPerWave: any) {
    return leaksPerWave?.filter((leaks: any) => leaks.length !== 0).length;
  }

  getSpellIcon(name: string) {
    return this.legionCdnUrl + getSpellByName(name)?.iconPath;
  }
}
