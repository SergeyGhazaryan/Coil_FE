export interface IFooterButtonsProps {
  page: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  handleCalculate: () => void;
  disabled: boolean;
}
