import { Dispatch, SetStateAction } from "react";
import { TableStateValues } from "../inputParameters/types";

export const LayersData = [
  {
    ModelName: "SGAirUV12",
    Number_of_Lamps: 5,
    Number_of_Columns: 1,
    Number_of_Rows: 1,
  },
  {
    ModelName: "SGAirUV18",
    Number_of_Lamps: 5,
    Number_of_Columns: 1,
    Number_of_Rows: 1,
  },
  {
    ModelName: "SGAirUV24",
    Number_of_Lamps: 5,
    Number_of_Columns: 1,
    Number_of_Rows: 1,
  },
  {
    ModelName: "SGAirUV30",
    Number_of_Lamps: 5,
    Number_of_Columns: 1,
    Number_of_Rows: 1,
  },
  {
    ModelName: "SGAirUV40",
    Number_of_Lamps: 5,
    Number_of_Columns: 1,
    Number_of_Rows: 1,
  },
  {
    ModelName: "SGAirUV50",
    Number_of_Lamps: 5,
    Number_of_Columns: 1,
    Number_of_Rows: 1,
  },
  {
    ModelName: "SGAirUV60",
    Number_of_Lamps: 5,
    Number_of_Columns: 1,
    Number_of_Rows: 1,
  },
  {
    ModelName: "SGAirUV18Q",
    Number_of_Lamps: 4,
    Number_of_Columns: 1,
    Number_of_Rows: 1,
  },
];

export const TableColumns = [
  {
    name: "Duct Width (x), mm",
    code: "widthX",
  },
  {
    name: "Duct Height (x), mm",
    code: "heightY",
  },
  {
    name: "Duct Length, mm",
    code: "lengthZ",
  },
  {
    name: "Reflector reflection coefficient (0, if no)",
    code: "reflectionCoeff",
  },
  {
    name: "Airflow",
    code: "airFlow",
  },
];

export interface IReportParametersProps {
  setValues: (value: TableStateValues) => void;
  type?: string;
  reportType: string;
  setDisabled: Dispatch<SetStateAction<boolean>>;
}
