import { SelectChangeEvent } from "@mui/material";
import { TableStateValues } from "components/feature/inputParameters/types";


export interface ILayersParametersProps {
  handleLayersNumber: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tableStateValues: TableStateValues;
  layersNumber: number[];
  handleChangeLayer: (e: SelectChangeEvent<string>, index: number) => void;
  layersInfo: Array<[number, string]>;
}
