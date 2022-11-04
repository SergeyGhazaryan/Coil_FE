import { ReportTypes } from "helpers/defaultInputValues";

export type CreateRouterProps = {
  setReportType: (value: ReportTypes) => void;
  setReportName: (value: string) => void;
  page: number;
  reportType: ReportTypes;
  reportName: string;
};

export const reportTypes = [ReportTypes.COILCLEAN, ReportTypes.BIOWALL];
