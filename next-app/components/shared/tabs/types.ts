export type ReportTabsProps = {
  tabValue: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
  labels: string[];
};
