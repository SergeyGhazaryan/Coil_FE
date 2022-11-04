export interface FakeData {
  name: string;
  values?: string | number;
  calories?: string | number;
  fat?: string | number;
}

export interface DataTableProps {
  data: any;
  width?: number;
  tableName: string;
  firstArgument: string;
  secondArgument: string;
  className?: string;
  rowOne?: string;
  rowTwo?: string;
  rowThree?: string;
  inactivationRate?: number[][];
  id?: string;
}

export const LampData: FakeData[] = [
  { name: "Lamp Model", calories: "-", fat: "-" },
  { name: "Lamp lower left en x , mm", calories: "-", fat: "-" },
  { name: "Lamp lower left end y, mm", calories: "-", fat: "-" },
];

export const CoilWidthForm = [
  { name: "Coil Width", calories: "-", fat: "mm" },
  { name: "Coil Height", calories: "-", fat: "mm" },
  { name: "Distance between lamp and coil", calories: "-", fat: "mm" },
  { name: "Downstream/Upstream coefficient (1if Downstream)", calories: "-" },
  { name: "Number of lamp rows", calories: "-" },
  { name: "Number of lamp columns", calories: "-" },
  { name: "Number of lamps", calories: "-" },
  { name: "Total Input Power", calories: "-", fat: "W" },
];

export const minimumUvForm = [
  { name: "Minimum UV Irradiation Intensity", calories: "-", fat: "W/cm2" },
  { name: "Avergae UV Irradiation Intensity", calories: "-", fat: "W/cm2" },
  { name: "Maximum UV Irradiation Intensity", calories: "-", fat: "W/cm2" },
];

export const aspergillusForm = [
  { name: "ASPERGILLUS NIGER", calories: "-", fat: "-" },
  { name: "Maximum", calories: "-", fat: "min" },
  { name: "Average", calories: "-", fat: "min" },
  { name: "Minimum", calories: "-", fat: "min" },
];
