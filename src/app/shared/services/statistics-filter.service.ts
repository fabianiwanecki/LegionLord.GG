import {Injectable, OnInit} from '@angular/core';
import {PatchService} from "./patch.service";
import {Observable, Subject, Subscriber} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StatisticsFilterService implements OnInit {

  selectedPatch:string = '';

  $selectedPatch = new Subject<string>();

  constructor(private patchService: PatchService) { }

  ngOnInit(): void {
    this.patchService.listPatches().subscribe((patches: any) => {
      this.selectedPatch = patches[0];
      this.$selectedPatch.next(this.selectedPatch);
    })
  }

  setSelectedPatch(patch: string) {
    this.$selectedPatch.next(patch);
  }
}
