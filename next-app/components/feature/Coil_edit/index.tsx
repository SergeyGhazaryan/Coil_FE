import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Divider } from "@mui/material";
import OptimizationTarget from "components/shared/optimizationTarget";
import { OptimizationTarget as target } from "components/shared/optimizationTarget/types";
import { MicroOrganisms } from "components/shared/selectMicroorganism/types";
import InputTable from "components/shared/inputTable";
import LampPosition from "components/shared/lampPosition";
import { MicroOrganismsSelect } from "components/shared/microorganismSelect";
import { Optimization } from "components/shared/optimization/optimization";
import { SidebarInfo } from "components/shared/sidebar_info";
import {
  getHistoryReport,
  updateHistoryReport,
} from "services/historyDataServise";
import { TableStateValues } from "../inputParameters/types";
import { TableColumns } from "../coil_report_parameters/types";
import Button from "../../shared/button";
import isEqual from "helpers/objectComparison";
import ResponsiveDialog from "components/shared/warningModal";
import { coilEditWarningModalContext } from "helpers/contexts";
import { defaultWarningModalText } from "constants/defaultWarningText";
import { ReportTypes } from "helpers/defaultInputValues";
import { windowsWidth } from "helpers/windowWidth";

import styles from "../../feature/Coil_edit/editReport.module.scss";

const ReportEditParameters = (): JSX.Element => {
  const router = useRouter();
  const [microOrganism, setMicroOrganism] = useState<boolean>(true);
  const [possition, setPossition] = useState<boolean>(true);
  const [coilEditEqual, setCoilEditEqual] = useState<boolean>(true);
  const [coilEditWarningModal, setCoilEditWarningModal] =
    useState<boolean>(false);
  const [reference, setReference] = useState<string>("");
  const [coilEditType, setCoilEditType] = useState<boolean>(true);
  const [optimizeArray, setOptimizeArray] = useState<boolean>(false);
  const [disable, setDisable] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(true);
  const [defaultTableValues, setDefaultTableValues] =
    useState<TableStateValues>({
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
      microorganismOption: "ASPERGILLUS NIGER",
      optType: "Microorganism",
      optimizeOption: [],
    });
  const [tableStateValues, setTableStateValues] =
    useState<TableStateValues>(defaultTableValues);

  const { id, type } = router.query;

  useEffect(() => {
    if (id) historyReport();
  }, [id]);

  useEffect(() => {
    if (optimizeArray) {
      setCoilEditEqual(false);
    } else {
      setCoilEditEqual(isEqual(tableStateValues, defaultTableValues));
    }
  }, [defaultTableValues, tableStateValues, optimizeArray]);

  useEffect(() => {
    setDisable(coilEditEqual);
  }, [coilEditEqual]);

  const historyReport = async () => {
    const { message } = await getHistoryReport(id, ReportTypes.COILCLEAN);
    if (message) {
      setDefaultTableValues({
        widthX: message.coilWidth,
        heightY: message.coilHeight,
        downstreamCoeff: message.downstream,
        maxDistToCoil: message.distance,
        requiredInactivationRate: message.requiredInactivationRate,
        maxInactivationTime: message.maxInactivationTime,
        susceptibilityCoefficient: message.susceptibilitycCoefficient,
        minimumUVIrrIntensity: message.minimumUvIrrIntensity,
        reflectionCoeff: message.reflectionCoeff,
        minDistWallX: message.minDistWallX,
        minDistWallY: message.minDistWallY,
        microorganismOption: message.configuration,
        optType: message.targetType.split(".")[1],
        optimizeOption: message.option,
      });
      setTableStateValues({
        widthX: message.coilWidth,
        heightY: message.coilHeight,
        downstreamCoeff: message.downstream,
        maxDistToCoil: message.distance,
        requiredInactivationRate: message.requiredInactivationRate,
        maxInactivationTime: message.maxInactivationTime,
        susceptibilityCoefficient: message.susceptibilitycCoefficient,
        minimumUVIrrIntensity: message.minimumUvIrrIntensity,
        reflectionCoeff: message.reflectionCoeff,
        minDistWallX: message.minDistWallX,
        minDistWallY: message.minDistWallY,
        microorganismOption: message.configuration,
        optType: message.targetType.split(".")[1],
        optimizeOption: message.option,
      });
    }
  };

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

  const handleChange = (e, key): void => {
    setTableStateValues({
      ...tableStateValues,
      [key]: e.target.value,
    });
  };

  const handleMicroorganismOption = (e): void => {
    setTableStateValues({
      ...tableStateValues,
      microorganismOption: e.target.value,
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

  const handleSave = async () => {
    const data = [
      tableStateValues.widthX,
      tableStateValues.heightY,
      tableStateValues.downstreamCoeff,
      tableStateValues.maxDistToCoil,
      tableStateValues.requiredInactivationRate,
      tableStateValues.maxInactivationTime,
      tableStateValues.susceptibilityCoefficient,
      tableStateValues.minimumUVIrrIntensity,
      tableStateValues.reflectionCoeff,
      tableStateValues.minDistWallX,
      tableStateValues.minDistWallY,
      tableStateValues.microorganismOption,
      tableStateValues.optType,
      tableStateValues.optimizeOption,
      id,
      type,
    ];
    await updateHistoryReport(data);
  };

  useEffect(() => {
    windowsWidth(setIsMobile);
  }, []);

  return (
    <>
      <coilEditWarningModalContext.Provider
        value={{
          setCoilEditWarningModal,
          reference,
          setReference,
          coilEditEqual,
          setCoilEditEqual,
          coilEditType,
        }}
      ></coilEditWarningModalContext.Provider>
      <coilEditWarningModalContext.Provider
        value={{
          setCoilEditWarningModal,
          reference,
          setReference,
          coilEditEqual,
          setCoilEditEqual,
          coilEditType,
        }}
      >
        <SidebarInfo reportType={type} tableStateValues={tableStateValues} open={open} setOpen={setOpen} />
        {coilEditWarningModal && !coilEditEqual && (
          <ResponsiveDialog
            coilEditModalType={true}
            text={defaultWarningModalText.defaultEditWarningMessage}
          />
        )}
        <div className={isMobile ? styles.content : styles.contentMobile}>
          <Box className="main">
            <h2 className={styles.heading}>Report Edit</h2>
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
            <OptimizationTarget
              on={handleChangePermission}
              checked={microOrganism}
            />
            {microOrganism ? (
              <MicroOrganismsSelect
                handleMicroorganismOption={handleMicroorganismOption}
                handleSusceptibilityCoefficient={
                  handleSusceptibilityCoefficient
                }
                tableStateValues={tableStateValues}
              />
            ) : (
              <InputTable name="Target Information">
                <div className={styles.inputSection}>
                  <div className={styles.inputContainer}>
                    <div className={styles.label}>
                      <p id="form_label">
                        Minimum UV irradiation intensity required, µW/cm²
                      </p>
                    </div>
                    <div className={styles.inputField}>
                      <input
                        type="number"
                        id="values"
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
                        <p id="form_label">Susceptibility coefficient, m²/J</p>
                      </div>
                      <div className={styles.inputField}>
                        <input
                          type="number"
                          id="values"
                          value={Number(
                            tableStateValues.susceptibilityCoefficient
                          )}
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
                      (
                        column: { name: string; code: string },
                        index: number
                      ) => (
                        <div
                          className={styles.inputContainer}
                          key={column.name}
                        >
                          <div className={styles.label}>
                            <p>{column.name}</p>
                          </div>
                          <div className={styles.inputField}>
                            <input
                              type="number"
                              value={tableStateValues[column.code]}
                              onChange={(event) =>
                                handleChange(event, column.code)
                              }
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
              reportType={type}
              setOptimizeArray={setOptimizeArray}
            />
            <Button
              disabled={disable}
              className={styles.optimize_button}
              handleClick={handleSave}
              text="Save"
            />
          </Box>
        </div>
      </coilEditWarningModalContext.Provider>
    </>
  );
};

export default ReportEditParameters;
