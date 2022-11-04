import { Dispatch, SetStateAction } from "react";
import { TableStateValues } from "../inputParameters/types";

export interface MiniSidebarProps {
  page?: number;
  setPage?: Dispatch<SetStateAction<number>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  reportType: string | string[];
  tableStateValues: TableStateValues;
  setReportType?: Dispatch<SetStateAction<string>>;
  reportName: string;
}
