import { useState, useEffect, useContext } from "react";
import { Divider, TextField } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { MicroOrganisms } from "components/shared/selectMicroorganism/types";
import * as React from "react";
import InputTable from "components/shared/inputTable";
import { MicroOrganismsTable } from "components/shared/microorganizmsTable";
import { TableStateValues } from "../inputParameters/types";
import { IReportParametersProps, LayersData, TableColumns } from "./types";
import { LayersParameters } from "components/shared/layersParameters";
import { MicroOrganismsSelect } from "components/shared/microorganismSelect";
import { Optimization } from "components/shared/optimization/optimization";
import { warningModalContext } from "helpers/contexts";
import { validValuesCheck } from "helpers/validValuesCheck";
import isEqual from "helpers/objectComparison";

import styles from "../../feature/biowall_report_parameters/biowallReportParameters.module.scss";

const BioWallReportParameters: React.FC<IReportParametersProps> = ({
  setValues,
  type,
  reportType,
  setDisabled,
}): JSX.Element => {
  const [layersNumber, setLayersNumber] = useState<number[]>([]);
  const [layersInfo, setLayersInfo] = useState<Array<[number, string]>>([]);
  const modalContext = useContext(warningModalContext);
  const [inactPassesErrorText, setInactPassesErrorText] =
    useState<boolean>(false);
  const [inactRateErrorText, setInactRateErrorText] = useState<boolean>(false);

  const defaultValue = {
    widthX: 500,
    heightY: 500,
    lengthZ: 5500,
    reflectionCoeff: 0.85,
    airFlow: 100,
    susceptibilityCoefficient: [MicroOrganisms[0].sum],
    inactPasses: 1,
    microorganismOption: [MicroOrganisms[0].name],
    inactRate: 2,
    optimizeOption: ["None"],
    layersData: [],
  };

  const [tableStateValues, setTableStateValues] =
    useState<TableStateValues>(defaultValue);

  useEffect(() => {
    modalContext.setIsEqual(isEqual(tableStateValues, defaultValue));
    if (layersNumber.length > 0) {
      modalContext.setIsEqual(false);
    }
    if (type) {
      modalContext?.setBiowallReportType(true);
      setDisabled(false);
    } else {
      modalContext?.setBiowallReportType(false);
    }
  }, [tableStateValues, layersNumber]);

  useEffect(() => {
    const susceptibilityCoefficient = MicroOrganisms.reduce((acc, curr) => {
      if (
        Array.isArray(tableStateValues.microorganismOption) &&
        tableStateValues.microorganismOption.some(
          (microorganism) => microorganism === curr.name
        )
      ) {
        acc.push(curr.sum);
      }
      return acc;
    }, []);

    setTableStateValues({
      ...tableStateValues,
      susceptibilityCoefficient: !susceptibilityCoefficient.length
        ? [MicroOrganisms[0].sum]
        : susceptibilityCoefficient,
    });
  }, [tableStateValues.microorganismOption]);

  const handleLayersNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    let arr = [];
    if (e.target.value !== "") {
      for (let i = 0; i < +e.target.value; i++) arr.push(i);
    }
    const layers_info = arr.reduce((acc, curr) => [...acc, [curr, ""]], []);
    setLayersInfo(layers_info);
    setLayersNumber(arr);
  };

  const handleMicroorganismOption = (e): void => {
    setTableStateValues({
      ...tableStateValues,
      microorganismOption: e.target.value,
      susceptibilityCoefficient: MicroOrganisms.map(
        (organism) =>
          e.target.value.some((name) => name === organism.name) && organism.sum
      ),
    });
  };

  const handleChange = (e, key): void => {
    setTableStateValues({
      ...tableStateValues,
      [key]: e.target.value,
    });

    if (key === "inactPasses") {
      setInactPassesErrorText(validValuesCheck(e.target.value, 1, 100));
    } else if (key === "inactRate") {
      setInactRateErrorText(validValuesCheck(e.target.value, 2, 10));
    }
  };

  const handleChangeLayer = (e: SelectChangeEvent<string>, index: number) => {
    setLayersInfo(
      layersInfo.map((layer: [number, string]) => {
        if (layer[0] === index) layer[1] = e.target.value;
        return layer;
      })
    );

    setTableStateValues({
      ...tableStateValues,
      layersData: LayersData.filter((layer) =>
        layersInfo.some((elem: [number, string]) => elem[1] === layer.ModelName)
      ),
    });
  };

  return (
    <>
      <InputTable name="Duct Information">
        <div className={styles.inputSection}>
          {TableColumns.map(
            (column: { name: string; code: string }, index: number) => (
              <div className={styles.inputContainer} key={column.name}>
                <div className={styles.label}>
                  <p id="form_label">{column.name}</p>
                </div>
                <div className={styles.inputField}>
                  <input
                    type="number"
                    id="values"
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
      {type && (
        <LayersParameters
          tableStateValues={tableStateValues}
          layersInfo={layersInfo}
          handleLayersNumber={handleLayersNumber}
          handleChangeLayer={handleChangeLayer}
          layersNumber={layersNumber}
        />
      )}
      {MicroOrganisms && (
        <MicroOrganismsSelect
          handleMicroorganismOption={handleMicroorganismOption}
          tableStateValues={tableStateValues}
        />
      )}
      <Divider />
      <MicroOrganismsTable
        className={styles.firstColumn}
        data={tableStateValues.microorganismOption}
        tableName="Dimensions and general information"
        firstArgument="Value"
        secondArgument="Measure"
      />
      <span className={styles.inactPassesContainer}>
        <TextField
          defaultValue={1}
          value={tableStateValues.inactPasses}
          label="Number of inactivation passes"
          InputLabelProps={{
            shrink: true,
          }}
          className={styles.inactPasses}
          onChange={(event) => handleChange(event, "inactPasses")}
          type="number"
        />
        {inactPassesErrorText && (
          <p className={styles.errorText}>
            Inact Passes must be between 1 and 100{" "}
          </p>
        )}
      </span>
      <span className={styles.inactRateContainer}>
        <TextField
          defaultValue={2}
          value={tableStateValues.inactRate}
          label="Inactivation rate: number of nines in the survival probability [from 2 to 10]"
          className={styles.inactRate}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(event) => handleChange(event, "inactRate")}
          type="number"
        />
        {inactRateErrorText && (
          <p className={styles.errorText}>
            Inact Passes must be between 2 and 10{" "}
          </p>
        )}
      </span>
      <Optimization
        type={type}
        tableStateValues={tableStateValues}
        setTableStateValues={setTableStateValues}
        reportType={reportType}
        setValues={setValues}
        setDisabled={setDisabled}
      />
    </>
  );
};

export default BioWallReportParameters;
