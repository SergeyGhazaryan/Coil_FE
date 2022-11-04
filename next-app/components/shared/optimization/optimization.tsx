import { useContext, useEffect, useState } from "react";
import { warningModalContext } from "helpers/contexts";
import { MenuItem, Select } from "@mui/material";
import OptimizeTable from "../optimize";
import { IOptimizationProps } from "./types";
import { ReportTypes } from "helpers/defaultInputValues";

import styles from "./optimization.module.scss";

export const Optimization: React.FC<IOptimizationProps> = ({
  tableStateValues,
  setTableStateValues,
  type,
  reportType,
  setValues,
  setDisabled,
  setOptimizeArray,
}) => {
  const modalContext = useContext(warningModalContext);
  const [initialOptimizedData, setInitialOptimizeData] = useState([]);
  const [availableConfigurations, setAvailableConfigurations] = useState<any[]>(
    []
  );
  const [defaultValue, setDefaultValue] = useState<string>(
    availableConfigurations?.[0]
  );

  useEffect(() => {
    if (
      availableConfigurations.length > 0 &&
      (availableConfigurations.length === 1 &&
      availableConfigurations[0] === "None"
        ? false
        : true) &&
      !!setOptimizeArray
    ) {
      setOptimizeArray(true);
    }

    if (setDisabled) {
      if (availableConfigurations.length === 0) {
        setAvailableConfigurations(["None"]);
      } else {
        setTableStateValues({
          ...tableStateValues,
        });
      }
      if (
        availableConfigurations.length === 1 &&
        availableConfigurations[0] === "None"
      ) {
        setDisabled(true);
        modalContext?.setOptimizationControl(true);
      } else if (availableConfigurations.length) {
        setDisabled(false);
        modalContext?.setOptimizationControl(false);
      } else {
        modalContext?.setOptimizationControl(true);
        setDisabled(true);
      }
    }
    if (availableConfigurations[0]) {
      setTableStateValues({
        ...tableStateValues,
        optimizeOption:
          reportType === ReportTypes.COILCLEAN
            ? availableConfigurations[0]
            : [availableConfigurations[0]],
      });
    }
  }, [availableConfigurations]);

  const handleOption = (e): void => {
    setDefaultValue(e.target.value);
    setTableStateValues({
      ...tableStateValues,
      optimizeOption:
        reportType === ReportTypes.COILCLEAN
          ? e.target.value
          : [e.target.value],
    });
  };

  useEffect(() => {
    if (setValues) {
      if (reportType === ReportTypes.BIOWALL) {
        setValues({
          ...tableStateValues,
          optimizeOption: initialOptimizedData.filter(
            (model) =>
              Array.isArray(tableStateValues.optimizeOption) &&
              tableStateValues.optimizeOption.some(
                (name) => model.Model_Name === name
              )
          ),
        });
      } else {
        setValues(tableStateValues);
      }
    }
  }, [tableStateValues]);

  return (
    <>
      {!type && (
        <>
          <OptimizeTable
            optimizeParameter={
              reportType === ReportTypes.BIOWALL
                ? [
                    tableStateValues.widthX,
                    tableStateValues.heightY,
                    tableStateValues.lengthZ,
                    tableStateValues.reflectionCoeff,
                    tableStateValues.airFlow,
                    tableStateValues.susceptibilityCoefficient,
                    tableStateValues.inactPasses,
                    tableStateValues.inactRate,
                  ]
                : Object.values(tableStateValues)
            }
            setOptimized={setAvailableConfigurations}
            reportType={reportType}
            setInitialOptimizeData={setInitialOptimizeData}
          />
          <p className={styles.configuration_title} id="form_label">
            Choose configuration
          </p>
          <Select
            labelId="demo-select-small"
            id="values"
            onChange={handleOption}
            value={
              availableConfigurations.length > 0
                ? defaultValue ?? availableConfigurations[0]
                : "None"
            }
            className={styles.mobileSelect}
          >
            {availableConfigurations.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </>
      )}
    </>
  );
};
