import {Component, Input} from '@angular/core';
import {dim, DimensionsType} from "../../models/DimensionsType";

@Component({
  selector: '[app-grid]',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {


  @Input() dimensions: DimensionsType = dim;
  @Input() xCount: number = 9;
  @Input() yCount: number = 14;

  xCountArray() {
    return new Array(this.xCount + 1);
  }

  yCountArray() {
    return new Array(this.yCount + 1);
  }
}
