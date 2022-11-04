import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Divider, IconButton, TextField } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { Box } from "@mui/system";
import { MicroOrganisms } from "components/shared/selectMicroorganism/types";
import InputTable from "components/shared/inputTable";
import { MicroOrganismsTable } from "components/shared/microorganizmsTable";
import Button from "components/shared/button";
import { TableStateValues } from "../inputParameters/types";
import { LayersData } from "./types";
import {
  getHistoryReport,
  updateBiowallHistoryReport,
} from "services/historyDataServise";
import { CircularProgress } from "@mui/material";
import ReportTabs from "../../shared/tabs";
import { TableColumns } from "../biowall_report_parameters/types";
import { LayersParameters } from "components/shared/layersParameters";
import { MicroOrganismsSelect } from "../../shared/microorganismSelect/index";
import { Optimization } from "components/shared/optimization/optimization";
import { SidebarInfo } from "components/shared/sidebar_info";
import ResponsiveDialog from "components/shared/warningModal";
import isEqual from "helpers/objectComparison";
import { editWarningModalContext } from "helpers/contexts";
import { defaultWarningModalText } from "constants/defaultWarningText";
import { ReportTypes } from "helpers/defaultInputValues";

import styles from "../Biowall_edit/biowallEdit.module.scss";

const BiowallEditPage = (): JSX.Element => {
  const router = useRouter();
  const [layersNumber, setLayersNumber] = useState<number[]>([]);
  const [open, setOpen] = useState<boolean>(true);
  const [layersNumberCheck, setLayersNumberCheck] = useState<boolean>(true);
  const [layersInfo, setLayersInfo] = useState<Array<[number, string]>>([]);
  const [type, setType] = useState(null);
  const [editWarningModal, setEditWarningModal] = useState<boolean>(false);
  const [equal, setIsEqual] = useState<boolean>(true);
  const [reference, setReference] = useState<string>("");
  const [disable, setDisable] = useState<boolean>(false);
  const [defaultTableValues, setDefaultTableValues] =
    useState<TableStateValues>({
      widthX: 500,
      heightY: 500,
      lengthZ: 500,
      reflectionCoeff: 0.5,
      airFlow: 100,
      susceptibilityCoefficient: [MicroOrganisms[0].sum],
      inactPasses: 1,
      inactRate: 1,
      microorganismOption: [MicroOrganisms[0].name],
      optimizeOption: [],
      layersData: [],
      report_name: "",
    });
  const [tableStateValues, setTableStateValues] =
    useState<TableStateValues>(defaultTableValues);

  const { id, type: report_type } = router.query;

  useEffect(() => {
    if (type) {
      setIsEqual(
        layersNumberCheck && isEqual(tableStateValues, defaultTableValues)
      );
    } else {
      setIsEqual(isEqual(tableStateValues, defaultTableValues));
    }
    if (
      tableStateValues?.layersData?.length !==
      defaultTableValues?.layersData?.length
    ) {
      setIsEqual(false);
    }
  }, [defaultTableValues, tableStateValues, layersNumber]);

  useEffect(() => {
    setDisable(equal);
  }, [equal]);

  useEffect(() => {
    if (id) historyReport();
  }, [id]);

  const historyReport = async () => {
    const { message } = await getHistoryReport(id, ReportTypes.BIOWALL);
    if (message) {
      setDefaultTableValues({
        ...tableStateValues,
        widthX: message.ductWidth,
        heightY: message.ductHeight,
        lengthZ: message.ductLength,
        reflectionCoeff: message.refCofficient,
        airFlow: message.Airflow,
        inactPasses: message.inact_passes,
        microorganismOption: message.microorganism.length
          ? message.microorganism.map((organism) => organism.Microorganism)
          : [MicroOrganisms[0].name],
        susceptibilityCoefficient: message.microorganism.map(
          (organism) => organism.SusceptibilityCoeff
        ),
        layersData: message.layers,
        report_name: message.report_name,
      });
      setTableStateValues({
        ...tableStateValues,
        widthX: message.ductWidth,
        heightY: message.ductHeight,
        lengthZ: message.ductLength,
        reflectionCoeff: message.refCofficient,
        airFlow: message.Airflow,
        inactPasses: message.inact_passes,
        microorganismOption: message.microorganism.length
          ? message.microorganism.map((organism) => organism.Microorganism)
          : [MicroOrganisms[0].name],
        susceptibilityCoefficient: message.microorganism.map(
          (organism) => organism.SusceptibilityCoeff
        ),
        layersData: message.layers,
        report_name: message.report_name,
      });

      const layers_info = message.layers.reduce(
        (acc, curr, index) => [...acc, [index, curr.ModelName]],
        []
      );
      setLayersInfo(layers_info);
      setLayersNumber(layers_info.map((_, index) => [index]));
    }
  };

  const handleLayersNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    let arr = [];

    setLayersNumberCheck(
      +e.target.value === tableStateValues.layersData.length
    );

    for (let i = 0; i < +e.target.value; i++) arr.push(i);

    const layers_info = arr.reduce((acc, curr) => [...acc, [curr, ""]], []);
    setLayersInfo([
      ...tableStateValues.layersData.map((layer, index) => [
        index,
        layer.ModelName,
      ]),
      ...layers_info.slice(tableStateValues.layersData.length),
    ]);
    setLayersNumber(arr);
  };

  const handleMicroorganismOption = (e): void => {
    setTableStateValues({
      ...tableStateValues,
      microorganismOption: e.target.value,
      susceptibilityCoefficient: e.target.value.map(
        (option) =>
          MicroOrganisms.find((organism) => organism.name === option)?.sum
      ),
    });
  };

  const handleChange = (e, key): void => {
    if (e.target.value === "" && key === "inactRate") {
      setTableStateValues({
        ...tableStateValues,
        [key]: 1,
      });
    } else {
      setTableStateValues({
        ...tableStateValues,
        [key]: e.target.value,
      });
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

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setType(newValue === 0 ? null : "optimize");
  };

  const handleSave = async () => {
    const data = [
      tableStateValues.widthX,
      tableStateValues.heightY,
      tableStateValues.lengthZ,
      tableStateValues.reflectionCoeff,
      tableStateValues.airFlow,
      tableStateValues.optimizeOption,
      MicroOrganisms.filter(
        (organism) =>
          Array.isArray(tableStateValues.microorganismOption) &&
          tableStateValues.microorganismOption.some(
            (name) => name === organism.name
          )
      ),
      tableStateValues.inactPasses,
      tableStateValues.report_name,
      tableStateValues.layersData,
      report_type,
      id,
    ];

    await updateBiowallHistoryReport(data);
  };

  return (
    <>
      <editWarningModalContext.Provider
        value={{
          setEditWarningModal,
          setIsEqual,
          reference,
          setReference,
          equal,
        }}
      >
        <SidebarInfo reportType={type} tableStateValues={tableStateValues} setOpen={setOpen} open={open} />
        <div className={styles.content}>
          {editWarningModal && !equal && (
            <ResponsiveDialog
              editModalType={true}
              text={defaultWarningModalText.defaultEditWarningMessage}
            />
          )}
          {Object.keys(tableStateValues).length ? (
            <div className={styles.content}>
              <Box className="main">
                <h2 className={styles.heading}>Report Edit</h2>
                <ReportTabs
                  handleChange={handleChangeTab}
                  tabValue={type ? 1 : 0}
                  labels={["Optimized", "Non Optimized"]}
                />
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
                {type && (
                  <LayersParameters
                    tableStateValues={tableStateValues}
                    layersInfo={layersInfo}
                    handleLayersNumber={handleLayersNumber}
                    handleChangeLayer={handleChangeLayer}
                    layersNumber={layersNumber}
                  />
                )}
                <MicroOrganismsSelect
                  tableStateValues={tableStateValues}
                  handleMicroorganismOption={handleMicroorganismOption}
                />
                <Divider />
                {!!tableStateValues.microorganismOption.length && (
                  <MicroOrganismsTable
                    className={styles.firstColumn}
                    data={tableStateValues.microorganismOption}
                    width={650}
                    tableName="Dimensions and general information"
                    firstArgument="Value"
                    secondArgument="Measure"
                  />
                )}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <TextField
                    label="Number of inactivation passes"
                    style={{ width: "398px", marginBottom: "40px" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(event) => handleChange(event, "inactPasses")}
                    type="number"
                    value={tableStateValues.inactPasses}
                  />
                  <TextField
                    label="Inactivation rate: number of nines in the survival probability [from 2 to 10]"
                    style={{ width: "398px" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(event) => handleChange(event, "inactRate")}
                    type="number"
                  />
                  <Optimization
                    type={type}
                    tableStateValues={tableStateValues}
                    setTableStateValues={setTableStateValues}
                    reportType={report_type}
                  />
                </div>
                <Button
                  disabled={disable}
                  className={styles.optimize_button}
                  handleClick={handleSave}
                  text="Save"
                />
              </Box>
            </div>

          ) : (
            <CircularProgress />
          )}
        </div>
      </editWarningModalContext.Provider>
    </>
  );
};

export default BiowallEditPage;
