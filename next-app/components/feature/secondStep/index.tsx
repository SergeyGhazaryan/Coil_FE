import ReportTabs from "components/shared/tabs";
import { ReportTypes } from "helpers/defaultInputValues";
import { useState } from "react";
import BioWallReportParameters from "../biowall_report_parameters";
import CoilReportParameters from "../coil_report_parameters";
import { ISecondStepProps } from "./types";

export const SecondStep: React.FC<ISecondStepProps> = ({
  reportType,
  setTableStateValues,
  page,
  loading,
  setDisabled,
}) => {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  return (
    <>
      {page == 2 && !loading && (
        <>
          {reportType !== ReportTypes.COILCLEAN ? (
            <>
              <ReportTabs
                handleChange={handleChange}
                tabValue={tabValue}
                labels={["Optimized", "Non Optimized"]}
              />
              {tabValue === 0 && (
                <BioWallReportParameters
                  setValues={(values) => setTableStateValues(values)}
                  reportType={reportType}
                  setDisabled={setDisabled}
                />
              )}
              {tabValue === 1 && (
                <BioWallReportParameters
                  setValues={(values) => setTableStateValues(values)}
                  type="optimize"
                  reportType={reportType}
                  setDisabled={setDisabled}
                />
              )}
            </>
          ) : (
            <CoilReportParameters
              setValues={(values) => setTableStateValues(values)}
              reportType={reportType}
              setDisabled={setDisabled}
            />
          )}
        </>
      )}
    </>
  );
};
