export interface OptimizeTableData {
  lampType: string;
  noRow: number;
  noColumn: number;
  distance?: number;
  noLamps: number;
  totalPower: number;
}

export default interface OptimizeTableDataProps {
  optimizeParameter: any;
  setOptimized: any;
  reportType: string | string[];
  setInitialOptimizeData?: (setInitialOptimizeData: any) => void;
}
