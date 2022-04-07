export interface  ScaleType {
  (d: any): any;
  range: () => any;
  domain: () => any;
  ticks: (numberOfTicks: number) => any;
  bandwidth?: any;
}
