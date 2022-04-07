export interface DimensionsType {
  width: number;
  height: number;
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
  boundedWidth(): number;
  boundedHeight(): number;
}

export const dim: DimensionsType = {
  width: 600,
  height: 300,
  marginBottom: 10,
  marginLeft: 10,
  marginRight: 10,
  marginTop: 10,
  boundedWidth(): number {
    return Math.max(this.width - this.marginRight - this.marginLeft, 0);
  },
  boundedHeight(): number {
    return Math.max(this.height - this.marginTop - this.marginBottom, 0);
  }
}
