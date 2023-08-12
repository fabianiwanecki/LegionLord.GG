import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import {PatchService} from "../../../shared/services/patch.service";
import {StatisticsFilterService} from "../../../shared/services/statistics-filter.service";

@Component({
  selector: 'app-statistics-filter',
  templateUrl: './statistics-filter.component.html',
  styleUrls: ['./statistics-filter.component.scss']
})
export class StatisticsFilterComponent implements AfterViewInit {

  constructor(private patchService: PatchService, public statisticsFilterService: StatisticsFilterService) {
  }

  ngAfterViewInit(): void {
    this.statisticsFilterService.setSelectedElo('BRONZE');
  }


}
