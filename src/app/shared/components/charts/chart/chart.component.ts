import {Component, Input} from '@angular/core';
import {dim, DimensionsType} from "../models/DimensionsType";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {

  @Input() dimensions: DimensionsType = dim;
  @Input() chartId?: string;

}
