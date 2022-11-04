import { Dispatch, SetStateAction } from "react";
import { TableStateValues } from "../../feature/inputParameters/types";

export interface ISideBarProps {
  page?: number;
  setPage?: Dispatch<SetStateAction<number>>;
  reportType: string | string[];
  tableStateValues: TableStateValues;
  setReportType?: Dispatch<SetStateAction<string>>;
  mobileOpen?: boolean;
  reportName?: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}
