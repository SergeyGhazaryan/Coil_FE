import { Dispatch, SetStateAction } from "react";
import { TableStateValues } from "../inputParameters/types";

export interface IReportParametersProps {
  setValues: (value: TableStateValues) => void;
  reportType: string;
  setDisabled: Dispatch<SetStateAction<boolean>>;
}

export const TableColumns = [
  {
    name: "Coil Width (x), mm",
    code: "widthX",
  },
  {
    name: "Coil Height (x), mm",
    code: "heightY",
  },
  {
    name: "Maximum distance from lamp to coil, mm",
    code: "downstreamCoeff",
  },
  {
    name: "Required inactivation rate, %",
    code: "requiredInactivationRate",
  },
  {
    name: "Max inactivation time, min",
    code: "maxInactivationTime",
  },
  {
    name: "Min distance from the wall in x direction, mm",
    code: "minDistWallX",
  },
  {
    name: "Min distance from the wall in y direction, mm",
    code: "minDistWallY",
  },
  {
    name: "Reflector reflection coefficient (0, if no)",
    code: "reflectionCoeff",
  },
];
