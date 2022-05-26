import {Injectable, OnInit} from '@angular/core';
import {PatchService} from "./patch.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StatisticsFilterService implements OnInit {

  selectedPatch: string = '';

  $selectedPatch = new Subject<string>();

  selectedElo: string = 'BRONZE';

  $selectedElo = new Subject<string>();

  constructor(private patchService: PatchService) {
  }

  ngOnInit(): void {
    this.patchService.listPatches().subscribe((patches: any) => {
      this.selectedPatch = patches[0];
      this.$selectedPatch.next(this.selectedPatch);
    })
  }

  setSelectedElo(elo: string) {
    this.selectedElo = elo;
    this.$selectedElo.next(elo);
  }

  setSelectedPatch(patch: string) {
    this.selectedPatch = patch;
    this.$selectedPatch.next(patch);
  }
}
