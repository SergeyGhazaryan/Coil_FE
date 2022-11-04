import { Dispatch, SetStateAction } from "react";
import { TableStateValues } from "../../feature/inputParameters/types";
export interface IOptimizationProps {
  tableStateValues: TableStateValues;
  type?: string;
  setTableStateValues: Dispatch<SetStateAction<TableStateValues>>;
  reportType: string | string[];
  setValues?: any;
  setDisabled?: Dispatch<SetStateAction<boolean>>;
  setOptimizeArray?: Dispatch<SetStateAction<boolean>>;
}
