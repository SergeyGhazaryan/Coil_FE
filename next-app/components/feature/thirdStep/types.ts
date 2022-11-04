import { TableStateValues } from "../inputParameters/types";

export interface IThirdStepProps {
  report_type: string;
  tableStateValues: TableStateValues;
  reportName: string;
  images: any;
  lampLoading: boolean;
  loading: boolean;
  page: number;
}
