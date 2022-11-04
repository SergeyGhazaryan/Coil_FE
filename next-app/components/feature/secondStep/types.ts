import { Dispatch, SetStateAction } from "react";
import { TableStateValues } from "../inputParameters/types";

export interface ISecondStepProps {
  reportType: string;
  setTableStateValues: Dispatch<SetStateAction<TableStateValues>>;
  page: number;
  loading: boolean;
  setDisabled: Dispatch<SetStateAction<boolean>>;
}
