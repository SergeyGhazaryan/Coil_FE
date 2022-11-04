import {
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { CreateRouterProps, reportTypes } from "./types";
import { ReportTypes } from "helpers/defaultInputValues";

import styles from "./FirstPage.module.scss";

const FirstPage: React.FC<CreateRouterProps> = ({
  setReportType,
  setReportName,
  page,
  reportType,
  reportName
}): JSX.Element => {
  const handleChangeReportName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setReportName(evt.target.value);
  };

  const handleChangeReportType = (event: SelectChangeEvent) => {
    setReportType(event.target.value as ReportTypes);
  };

  return (
    <>
      {page == 1 && (
        <>
          <InputLabel id="label">Select Report Type</InputLabel>
          <Select
            labelId="label"
            defaultValue={reportType}
            onChange={handleChangeReportType}
            className={styles.reportTypeSelect}
          >
            {reportTypes.map((value: string) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
          <div className={styles.inputField}>
            <InputLabel id="name_label">Report name</InputLabel>
            <TextField
              type="text"
              value={reportName}
              onChange={handleChangeReportName}
              className={styles.reportNameField}
              required
              placeholder="Report Name"
            />
          </div>
        </>
      )}
    </>
  );
};

export default FirstPage;
