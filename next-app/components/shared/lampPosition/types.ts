export enum LampPositionTarget {
  MicroOrganism = "Downstream",
  Intensity = "Upstream",
}

export default interface LampPositionProps {
  checked: boolean;
  on: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
}
