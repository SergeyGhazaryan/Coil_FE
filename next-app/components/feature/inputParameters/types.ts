export interface TableStateValues {
  downstreamCoeff?: number;
  maxDistToCoil?: number;
  requiredInactivationRate?: number;
  maxInactivationTime?: number;
  minimumUVIrrIntensity?: number;
  minDistWallX?: number;
  minDistWallY?: number;
  optType?: string;
  optimizeOption: string | number | string[];
  widthX: number;
  heightY: number;
  lengthZ?: number;
  reflectionCoeff?: number;
  inactPasses?: number;
  susceptibilityCoefficient: number | number[];
  airFlow?: number;
  microorganismOption: string | string[];
  inactRate?: number;
  layersData?: any[];
  report_name?: string;
}
