export enum OptimizationTarget {
  MicroOrganism = "Microorganism",
  Intensity = "Intensity",
}

export default interface OptimizationTargetProps {
  checked: boolean;
  on: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
}
