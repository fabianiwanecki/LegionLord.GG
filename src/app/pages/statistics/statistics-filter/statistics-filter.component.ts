import {Component, OnInit} from '@angular/core';
import {PatchService} from "../../../shared/services/patch.service";
import {StatisticsFilterService} from "../../../shared/services/statistics-filter.service";

@Component({
  selector: 'app-statistics-filter',
  templateUrl: './statistics-filter.component.html',
  styleUrls: ['./statistics-filter.component.scss']
})
export class StatisticsFilterComponent implements OnInit {

  patches: any;

  constructor(private patchService: PatchService, public statisticsFilterService: StatisticsFilterService) {
  }

  ngOnInit(): void {
    this.patchService.listPatches().subscribe(patches => {
      this.patches = patches;
      this.statisticsFilterService.setSelectedPatch(this.patches[0].patch);
    });
  }
}
