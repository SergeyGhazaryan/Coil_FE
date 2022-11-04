import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { MicroOrganisms } from "components/shared/selectMicroorganism/types";
import ResponsiveDialog from "components/shared/warningModal";
import { defaultWarningModalText } from "constants/defaultWarningText";
import { CoilTypeEnum, BioWallTypeEnum } from "helpers/typeEnum";
import { SidebarInfo } from "components/shared/sidebar_info";
import { getHistoryData } from "services/historyDataServise";
import { TableStateValues } from "../inputParameters/types";
import { columns, Types } from "./types";
import { windowsWidth } from "helpers/windowWidth";

import styles from "./reportHistory.module.scss";

const ReportHistory = (): JSX.Element => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [warningModal, setWarningModal] = useState<boolean>(false);
  const [reportId, setReportId] = useState<number>(0);
  const [row, setRow] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(true);
  const [initialRows, setInitialRows] = useState<any[]>([]);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { type } = useRouter().query;
  const [types, setTypes] = useState<Types>({
    FEShow: "CoilClean",
    BEReqBody: "coilclean",
    BEResult: "CoilReports",
  });
  const [buttonColor, setButtonColor] = useState({
    coilBtnColor: "white",
    coilBtnBgColor: "var(--buttonColor)",
    bioBtnColor: "var(--buttonColor)",
    bioBtnBgColor: "white",
  });
  const [tableStateValues, setTableStateValues] = useState<TableStateValues>({
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
    optimizeOption: 0,
  });

  const getHistory = async (types) => {
    setLoading(true);
    const data = await getHistoryData(types.BEReqBody);
    if (data[types.BEResult]) {
      setInitialRows(data[types.BEResult]);
      setRow(data[types.BEResult]);
      setLoading(false);
    }
  };

  useEffect(() => {
    getHistory(types);
  }, []);

  useEffect(() => {
    windowsWidth(setIsMobile);
  }, []);

  const handleChangePage = (e, newPage): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e): void => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  const requestSearch = (e): void => {
    const filteredRows = initialRows.filter((row) =>
      row.report_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setRow(filteredRows);
  };

  const remove = async (e): Promise<void> => {
    setReportId(e.currentTarget.id);
    setWarningModal(true);
  };

  const handleChangeHistory = async (e): Promise<void> => {
    if (e.target.id == "Coil") {
      await getHistory(CoilTypeEnum);
      setTypes(CoilTypeEnum);
      setButtonColor({
        coilBtnColor: "white",
        coilBtnBgColor: "var(--buttonColor)",
        bioBtnColor: "var(--buttonColor)",
        bioBtnBgColor: "white",
      });
    } else {
      await getHistory(BioWallTypeEnum);
      setTypes(BioWallTypeEnum);
      setButtonColor({
        bioBtnColor: "white",
        bioBtnBgColor: "var(--buttonColor)",
        coilBtnColor: "var(--buttonColor)",
        coilBtnBgColor: "white",
      });
    }
  };

  return (
    <>
      <SidebarInfo reportType={type} tableStateValues={tableStateValues} setOpen={setOpen} open={open} />
      <div className={isMobile ? styles.content : styles.contentSidebarClose}>
        {warningModal && (
          <ResponsiveDialog
            text={defaultWarningModalText.defaultRemoveMessage}
            closeButtonText={
              defaultWarningModalText.defaultRemoveCloseButtonText
            }
            agreeButtonText={
              defaultWarningModalText.defaultRemoveAgreeButtonText
            }
            removeModalType={true}
            reportTypes={types}
            reportId={reportId}
            BERequestBody={types.BEReqBody}
            getHistory={getHistory}
            setWarningModal={setWarningModal}
          />
        )}
        <div className={styles.buttonSection}>
          <button
            id="Coil"
            className={styles.typesButton}
            style={{
              color: `${buttonColor.coilBtnColor}`,
              background: `${buttonColor.coilBtnBgColor}`,
            }}
            onClick={handleChangeHistory}
          >
            CoilClean History
          </button>
          <button
            id="BioWall"
            className={styles.typesButton}
            style={{
              color: `${buttonColor.bioBtnColor}`,
              background: `${buttonColor.bioBtnBgColor}`,
            }}
            onClick={handleChangeHistory}
          >
            Biowall History
          </button>
        </div>
        <Box className="main">
          {!loading ? (initialRows.length > 0 ?
            <>
              <p className={styles.title}>View Reports</p>
              <div className={styles.searchBlock}>
                <TextField
                  id="search"
                  label="Search field"
                  type="search"
                  onChange={requestSearch}
                />
              </div>

              <Paper className={styles.root}>
                <TableContainer className={styles.container}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead className={styles.tableHead}>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={
                              column.id == "edit/delete" ? "right" : "left"
                            }
                            sx={{ background: "#08645e" }}
                            style={{ minWidth: column.minWidth }}
                            className={styles.headTableCell}
                          >
                            <p>{column.label}</p>
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {row
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                          return (
                            <TableRow
                              id={row.id}
                              tabIndex={-1}
                              key={row.code}
                              className={styles.backgroundColor}
                            >
                              <TableCell
                                align="left"
                                className={styles.tableCell}
                              >
                                {row.report_name}
                              </TableCell>
                              <TableCell
                                align="left"
                                className={styles.tableCell}
                              >
                                {row.created_at.substr(4, 12)}
                              </TableCell>
                              <TableCell align="right">
                                <Link
                                  href={`/edit/${row.id
                                    }?type=${types.FEShow.toLowerCase()}`}
                                >
                                  <EditIcon
                                    id={row.id}
                                    style={{ cursor: "pointer" }}
                                  />
                                </Link>
                                &nbsp; &nbsp;
                                <DeleteIcon
                                  id={row.id}
                                  onClick={remove}
                                  sx={{
                                    color: "red",
                                  }}
                                />
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 20]}
                  component="div"
                  count={row && row.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  className={styles.backgroundColor}
                />
              </Paper>
            </> : <h1>History is Empty</h1>
          ) : (<>
            {loading && <div className={styles.loading}>
              <CircularProgress />
            </div>}
          </>
          )}
        </Box>
      </div>
    </>
  );
};

export default ReportHistory;
