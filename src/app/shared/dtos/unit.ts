export interface Unit {
  id: string;
  unitId: string;
  name: string;
  cost: number;
  enabled: boolean;
  iconPath: string;
  upgradesFrom: string;
}
