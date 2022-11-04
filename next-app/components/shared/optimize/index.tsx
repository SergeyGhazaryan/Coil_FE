import { useState } from "react";
import Table from "@mui/material/Table";
import { CircularProgress } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { OptimizeTableData } from "./types";
import OptimizeTableDataProps from "./types";
import {
  getCoilOptimize,
  getBioWhallOptimize,
} from "services/inputDataService";
import Button from "../../../components/shared/button";
import DescriptionAlerts from "../errorHandler/errorMessage";
import { ReportTypes } from "helpers/defaultInputValues";

import styles from "../../shared/optimize/optimize.module.scss";

function createDataCoil(data: any[]): OptimizeTableData {
  let lampType = data[0];
  let noRow = data[1];
  let noColumn = data[2];
  let distance = data[3];
  let noLamps = data[4];
  let totalPower = data[5];

  return { lampType, noRow, noColumn, distance, noLamps, totalPower };
}

function createDataBiowall(data: any): OptimizeTableData {
  let lampType = data.Model_Name;
  let noRow = data.Number_of_Rows;
  let noColumn = data.Number_of_Columns;
  let noLamps = data.Number_of_Lamps;
  let totalPower = data.Total_Power;

  return { lampType, noRow, noColumn, noLamps, totalPower };
}

export default function OptimizeTable({
  setOptimized,
  optimizeParameter,
  reportType,
  setInitialOptimizeData,
}: OptimizeTableDataProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [optimizeData, setoptimizeData] = useState<any[]>([]);
  const [loadIcon, setLoadIcon] = useState(false);
  const [alert, setAlert] = useState(false);

  const assignData = async (): Promise<void> => {
    setLoading(true);
    setLoadIcon(true);
    try {
      const apiData =
      reportType === ReportTypes.COILCLEAN
          ? await getCoilOptimize(optimizeParameter)
          : await getBioWhallOptimize(optimizeParameter);
      if (apiData) {
        let rows = [];
        if (reportType !== ReportTypes.COILCLEAN) setInitialOptimizeData(apiData);
        apiData.forEach((element: any[]) => {
          rows.push(
            reportType === ReportTypes.COILCLEAN
              ? createDataCoil(element)
              : createDataBiowall(element)
          );
        });
        setoptimizeData(rows);
        const availableRows = rows.filter((row) => row.noRow != "None");
        const availableConfigs = availableRows.map((row) => row.lampType);
        setOptimized(availableConfigs);
        setLoading(false);
        setLoadIcon(false);
      } else {
        setLoading(true);
      }
    } catch (error) {
      setAlert(true)
      setTimeout(() => setAlert(false), 3000);
      setLoading(false);
    }
  };

  const handleOptimize = (): void => {
    assignData();
  };

  return (
    <>
      <Button
        className={styles.optimize_button}
        handleClick={handleOptimize}
        text="Optimize"
      />
      <p className={styles.table_title}>Proposed lamp configurations</p>
      {!loading ? (
        <>
          {" "}
          {!alert && optimizeData.length > 0 ? (
            <TableContainer component={Paper} className={styles.optimizationTable} >
              <Table className={styles.table} aria-label="simple table">
                <TableHead className={styles.tableHead}>
                  <TableRow>
                    <TableCell className={styles.tableHeadCell}>
                      <p>Lamp type</p>
                    </TableCell>
                    <TableCell className={styles.tableHeadCell} align="right">
                      <p>Number of rows</p>
                    </TableCell>
                    <TableCell className={styles.tableHeadCell} align="right">
                      <p>Number of columns</p>
                    </TableCell>
                    {reportType === ReportTypes.COILCLEAN && (
                      <TableCell className={styles.tableHeadCell} align="right">
                        <p>Distance between lamp and coil, mm</p>
                      </TableCell>
                    )}
                    <TableCell className={styles.tableHeadCell} align="right">
                      <p>Number of lamps</p>
                    </TableCell>
                    <TableCell className={styles.tableHeadCell} align="right">
                      <p>Total electrical lamp power, W</p>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {optimizeData.map((row, index) => (
                    <TableRow key={index} className={styles.tableRow}>
                      <TableCell component="th" scope="row">
                        {row.lampType}
                      </TableCell>
                      <TableCell align="right">{row.noRow}</TableCell>
                      <TableCell align="right">{row.noColumn}</TableCell>
                      {reportType === ReportTypes.COILCLEAN && (
                        <TableCell align="right">{row.distance}</TableCell>
                      )}
                      <TableCell align="right">{row.noLamps}</TableCell>
                      <TableCell align="right">{row.totalPower}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <>
              {alert && (
                <DescriptionAlerts text={"No valid data for optimization"}/>
              )}
            </>
          )}
        </>
      ) : (
        <>{loadIcon && <CircularProgress />}</>
      )}
    </>
  );
}
