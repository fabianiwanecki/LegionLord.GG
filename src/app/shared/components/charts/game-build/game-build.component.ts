import {Component, Input, OnInit} from '@angular/core';
import {DimensionsType} from "../models/DimensionsType";
import {getUniqueId} from "../models/id";
import {getByUnitId} from "../../../game-data/UnitData";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-game-build',
  templateUrl: './game-build.component.html',
  styleUrls: ['./game-build.component.scss']
})
export class GameBuildComponent implements OnInit {

  dimensions: DimensionsType;
  chartId: string = getUniqueId('Chart');
  xCount = 9;
  yCount = 14;
  @Input() gridSize = 22;
  @Input() units: any[] = [];


  xPosAccessor = (d: any) => (d.split(':')[1].split('|')[0] - .5) * this.gridSize;
  yPosAccessor = (d: any) => (this.yCount - 1) * this.gridSize - (d.split(':')[1].split('|')[1] - .5) * this.gridSize;
  hrefAccessor = (d: any) => {
    return environment.legionCdnUrl + getByUnitId(d.split(':')[0]).iconPath
  };

  constructor() {
    this.dimensions = {
      width: this.xCount * this.gridSize,
      height: this.yCount * this.gridSize,
      marginTop: 0,
      marginRight: 0,
      marginBottom: 0,
      marginLeft: 0,
      boundedWidth(): number {
        return Math.max(this.width - this.marginRight - this.marginLeft, 0);
      },
      boundedHeight(): number {
        return Math.max(this.height - this.marginTop - this.marginBottom, 0);
      }
    };
  }

  ngOnInit(): void {
  }

}
