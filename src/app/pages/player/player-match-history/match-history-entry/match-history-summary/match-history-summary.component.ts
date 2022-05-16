import {Component, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../../../../environments/environment";
import {MercenaryService} from "../../../../../shared/services/mercenary.service";

@Component({
  selector: 'app-match-history-summary',
  templateUrl: './match-history-summary.component.html',
  styleUrls: ['./match-history-summary.component.scss']
})
export class MatchHistorySummaryComponent {

  @Input() entry: any;
  legionCdnUrl = environment.legionCdnUrl;

  constructor(private route: ActivatedRoute,
              public mercenaryService: MercenaryService) {
  }

  getPlayer() {
    return this.entry?.playersData.filter((playerData: any) => playerData.playerName.toLowerCase() === this.route.snapshot.paramMap.get('id')?.toLowerCase())[0];
  }

  getWavesLeakedCount(leaksPerWave: any) {
    return leaksPerWave?.filter((leaks: any) => leaks.length !== 0).length;
  }
}
