import { ReportTypes } from "helpers/defaultInputValues";

export default interface ImagesProps {
  images: any;
  isLoading?: boolean;
  requiredInactivationRate?: number;
  tableValues: any[];
  reportType?: ReportTypes;
  tableStateValues: object;
}
