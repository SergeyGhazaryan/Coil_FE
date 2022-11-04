import { Dispatch, SetStateAction } from "react";
import { TableStateValues } from "../inputParameters/types";

export interface SidebarProps {
  page?: number;
  setPage?: Dispatch<SetStateAction<number>>;
  open: boolean;
  drawerWidth: number;
  setHistory?: (data) => any;
  reportType?: string | string[];
  tableStateValues: TableStateValues;
  setReportType?: Dispatch<SetStateAction<string>>;
  mobileOpen?: boolean;
  reportName: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  isMobile: boolean;
}
