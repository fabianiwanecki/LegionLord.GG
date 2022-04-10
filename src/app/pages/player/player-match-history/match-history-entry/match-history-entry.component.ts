import {Component, Input} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {MercenaryService} from "../../../../shared/services/mercenary.service";

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


  constructor(public mercenaryService: MercenaryService) {
  }

  floor(number: number) {
    return Math.floor(number);
  }
}
