import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {getUniqueId} from "../models/id";
import {DimensionsType} from "../models/DimensionsType";

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent {

  @Input() value: number = 100;
  @Input() height: number = 16;
  @Input() color: string = '#ffffff'
  chartId: string = getUniqueId('Chart');
  dimensions: DimensionsType;
  @ViewChild('container', {static: true}) container!: ElementRef;

  constructor() {
    this.dimensions = {
      width: 150,
      height: this.height,
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
}
