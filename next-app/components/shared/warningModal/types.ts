import { Dispatch, SetStateAction } from "react";

export interface ResponsiveDialogTypes {
  setPage?: Dispatch<SetStateAction<number>>;
  page?: number;
  text?: string;
  closeButtonText?: string;
  agreeButtonText?: string;
  removeModalType?: boolean;
  reportTypes?: object;
  reportId?: string | number;
  BERequestBody?: string;
  getHistory?: (types) => Promise<void>;
  setWarningModal?: (boolean) => void;
  setEditWarningModal?: (boolean) => void;
  editModalType?: boolean;
  coilEditModalType?: boolean;
}
