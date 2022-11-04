import React, { useState, useEffect, useContext } from "react";
import { Divider } from "@mui/material";
import OptimizationTarget from "components/shared/optimizationTarget";
import { OptimizationTarget as target } from "components/shared/optimizationTarget/types";
import { MicroOrganisms } from "components/shared/selectMicroorganism/types";
import LampPosition from "components/shared/lampPosition";
import { MicroOrganismsSelect } from "components/shared/microorganismSelect";
import { IReportParametersProps, TableColumns } from "./types";
import { TableStateValues } from "../inputParameters/types";
import { warningModalContext } from "helpers/contexts";
import isEqual from "helpers/objectComparison";
import { Optimization } from "components/shared/optimization/optimization";
import InputTable from "components/shared/inputTable";

import styles from "../../feature/coil_report_parameters/coilReportParameters.module.scss";

const CoilReportParameters: React.FC<IReportParametersProps> = ({
  setValues,
  reportType,
  setDisabled,
}): JSX.Element => {
  const [microOrganism, setMicroOrganism] = useState<boolean>(true);
  const [possition, setPossition] = useState<boolean>(true);
  const modalContext = useContext(warningModalContext);

  const defaultValue = {
    widthX: 1600,
    heightY: 1600,
    downstreamCoeff: 0.85,
    maxDistToCoil: 1000,
    requiredInactivationRate: 99,
    maxInactivationTime: 60,
    susceptibilityCoefficient: MicroOrganisms[0].sum,
    minimumUVIrrIntensity: 500,
    reflectionCoeff: 0.5,
    minDistWallX: 30,
    minDistWallY: 130,
    microorganismOption: "ANTHRAX",
    optType: "Microorganism",
    optimizeOption: "None",
  };

  const [tableStateValues, setTableStateValues] =
    useState<TableStateValues>(defaultValue);

  useEffect(() => {
    modalContext.setIsEqual(isEqual(tableStateValues, defaultValue));
  }, [tableStateValues]);

  useEffect(() => {
    setValues(tableStateValues);
  }, [tableStateValues, setValues]);

  const handleDownstreamCoeff = (e): void => {
    if (e.target.value == "Downstream") {
      setTableStateValues({ ...tableStateValues, downstreamCoeff: 0.85 });
      setPossition(true);
    } else {
      setTableStateValues({ ...tableStateValues, downstreamCoeff: 1 });
      setPossition(false);
    }
  };

  const handleSusceptibilityCoefficient = (sum): void => {
    setTableStateValues({
      ...tableStateValues,
      susceptibilityCoefficient: sum,
    });
  };

  const handleMicroorganismOption = (e): void => {
    setTableStateValues({
      ...tableStateValues,
      microorganismOption: e.target.value,
      susceptibilityCoefficient: MicroOrganisms.find(
        (organism) => organism.name === e.target.value
      ).sum,
    });
  };

  const handleChange = (e, key): void => {
    setTableStateValues({
      ...tableStateValues,
      [key]: e.target.value,
    });
  };

  const handleOptType = (): void => {
    setTableStateValues({
      ...tableStateValues,
      optType: microOrganism ? target.Intensity : target.MicroOrganism,
    });
  };

  const handleChangePermission = (e): void => {
    handleOptType();
    setMicroOrganism(target.MicroOrganism == e.target.value);
  };

  return (
    <>
      <InputTable name="Duct Information">
        <div className={styles.inputSection}>
          {TableColumns.slice(0, 3).map(
            (column: { name: string; code: string }, index: number) => (
              <div className={styles.inputContainer} key={column.name}>
                <div className={styles.label}>
                  <p>{column.name}</p>
                </div>
                <div className={styles.inputField}>
                  <input
                    type="number"
                    value={tableStateValues[column.code]}
                    onChange={(event) => handleChange(event, column.code)}
                    required
                  />
                </div>
              </div>
            )
          )}
        </div>
      </InputTable>
      <Divider />
      <LampPosition on={handleDownstreamCoeff} checked={possition} />
      <Divider />
      <OptimizationTarget on={handleChangePermission} checked={microOrganism} />
      {microOrganism ? (
        <MicroOrganismsSelect
          handleMicroorganismOption={handleMicroorganismOption}
          handleSusceptibilityCoefficient={handleSusceptibilityCoefficient}
          tableStateValues={tableStateValues}
        />
      ) : (
        <InputTable name="Target Information">
          <div className={styles.inputSection}>
            <div className={styles.inputContainer}>
              <div className={styles.label}>
                <p>Minimum UV irradiation intensity required, µW/cm²</p>
              </div>
              <div className={styles.inputField}>
                <input
                  type="number"
                  value={tableStateValues.minimumUVIrrIntensity}
                  onChange={(event) =>
                    handleChange(event, "minimumUVIrrIntensity")
                  }
                  required
                />
              </div>
            </div>
          </div>
        </InputTable>
      )}
      <Divider />
      {microOrganism && (
        <div>
          <InputTable name="Target Information">
            <div className={styles.inputSection}>
              <div className={styles.inputContainer}>
                <div className={styles.label}>
                  <p>Susceptibility coefficient, m²/J</p>
                </div>
                <div className={styles.inputField}>
                  <input
                    type="number"
                    value={Number(tableStateValues.susceptibilityCoefficient)}
                    disabled
                    required
                  />
                </div>
              </div>
            </div>
          </InputTable>
          <InputTable name=".">
            <div className={styles.inputSection}>
              {TableColumns.slice(3, 5).map(
                (column: { name: string; code: string }, index: number) => (
                  <div className={styles.inputContainer} key={column.name}>
                    <div className={styles.label}>
                      <p>{column.name}</p>
                    </div>
                    <div className={styles.inputField}>
                      <input
                        type="number"
                        value={tableStateValues[column.code]}
                        onChange={(event) => handleChange(event, column.code)}
                        required
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          </InputTable>
          <Divider />
        </div>
      )}
      <InputTable name="Common Information">
        <div className={styles.inputSection}>
          {TableColumns.slice(5).map(
            (column: { name: string; code: string }, index: number) => (
              <div className={styles.inputContainer} key={column.name}>
                <div className={styles.label}>
                  <p>{column.name}</p>
                </div>
                <div className={styles.inputField}>
                  <input
                    type="number"
                    value={tableStateValues[column.code]}
                    onChange={(event) => handleChange(event, column.code)}
                    required
                  />
                </div>
              </div>
            )
          )}
        </div>
      </InputTable>
      <Divider />
      <Optimization
        tableStateValues={tableStateValues}
        setTableStateValues={setTableStateValues}
        reportType={reportType}
        setValues={setValues}
        setDisabled={setDisabled}
      />
    </>
  );
};

export default CoilReportParameters;
