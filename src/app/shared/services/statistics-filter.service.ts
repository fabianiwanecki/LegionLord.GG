import {Injectable} from '@angular/core';
import {PatchService} from "./patch.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StatisticsFilterService {

  selectedElo: string = 'BRONZE';

  $selectedElo = new Subject<string>();

  selectedQueueType: string = 'NORMAL';

  $selectedQueueType = new Subject<string>();

  setSelectedElo(elo: string) {
    this.selectedElo = elo;
    this.$selectedElo.next(elo);
  }

  setSelectedQueueType(queueType: string) {
    this.selectedQueueType = queueType;
    this.$selectedQueueType.next(queueType);
  }
}
