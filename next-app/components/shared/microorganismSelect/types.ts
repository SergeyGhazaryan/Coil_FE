import { TableStateValues } from "components/feature/inputParameters/types";

export interface IMicroOrganismsSelectProps {
  handleMicroorganismOption: (e) => void;
  handleSusceptibilityCoefficient?: (sum: number) => void;
  tableStateValues?: TableStateValues;
}
