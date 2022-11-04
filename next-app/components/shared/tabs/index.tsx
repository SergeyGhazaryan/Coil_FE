import { Tab, Tabs } from "@mui/material";
import { ReportTabsProps } from "./types";

import styles from "./tabs.module.scss";

const ReportTabs: React.FC<ReportTabsProps> = ({
  tabValue,
  handleChange,
  labels,
}): JSX.Element => {
  return (
    <Tabs
      value={tabValue}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons={false}
      aria-label="scrollable prevent tabs example"
      className={styles.tabs}
      classes={{ indicator: styles.indicator }}
    >
      {labels.map((label) => (
        <Tab
          key={label}
          label={label}
          className={styles.tab}
        />
      ))}
    </Tabs>
  );
};

export default ReportTabs;
