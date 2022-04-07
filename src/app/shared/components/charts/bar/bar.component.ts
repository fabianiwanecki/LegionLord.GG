import {Component, Input, OnInit} from '@angular/core';
import {DimensionsType} from "../models/DimensionsType";
import {getUniqueId} from "../models/id";
import {AccessorType} from "../models/AccessorType";
import {axisBottom, axisLeft, InternSet, map, max, range, scaleBand, scaleLinear} from "d3";

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {

  @Input() data: any;
  dimensions: DimensionsType;
  chartId: string = getUniqueId('Chart');
  width = 350;
  xAxis: any;
  yAxis: any;
  i: any;
  xScale: any;
  yScale: any;
  x: any;
  y: any;

  xAccessor: AccessorType = (d: any) => d.label;
  yAccessor: AccessorType = (d: any) => d.value;
  yFormat = '%';
  color = 'steelblue';


  constructor() {
    this.dimensions = {
      width: this.width,
      height: this.width * .9,
      marginTop: 20,
      marginRight: 0,
      marginBottom: 50,
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
    this.drawChart();
  }

  drawChart() {
    this.x = map(this.data, this.xAccessor);
    this.y = map(this.data, this.yAccessor);

    let xDomain: any = this.x;
    const yDomain: any = [0, max(this.y)];
    xDomain = new InternSet(xDomain);

    this.i = range(this.x.length);

    this.xScale = scaleBand(xDomain, [0, this.dimensions.boundedWidth()]).padding(.1);
    this.yScale = scaleLinear(yDomain, [this.dimensions.boundedHeight(), 0]);

    this.xAxis = axisBottom(this.xScale).tickSizeOuter(0);
    this.yAxis = axisLeft(this.yScale).ticks(this.dimensions.boundedHeight() / 40, this.yFormat);
  }
}
