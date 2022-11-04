import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { LayersTableProps } from "./types";

import styles from "./optimize.module.scss";

export default function LayersTable({ tableData }: LayersTableProps) {
  return (
    <>
      <TableContainer component={Paper} sx={{ marginBottom: "80px" }}>
        <Table className={styles.table} aria-label="simple table">
          <TableHead className={styles.tableHead}>
            <TableRow>
              <TableCell className={styles.tableHeadCell}>Model Name</TableCell>
              <TableCell className={styles.tableHeadCell} align="right">
                Number of Rows
              </TableCell>
              <TableCell className={styles.tableHeadCell} align="right">
                Number of Columns
              </TableCell>

              <TableCell className={styles.tableHeadCell} align="right">
                Number of lamps
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={index} className={styles.tableRow}>
                <TableCell component="th" scope="row">
                  {row.ModelName}
                </TableCell>
                <TableCell align="right">{row.Number_of_Rows}</TableCell>
                <TableCell align="right">{row.Number_of_Columns}</TableCell>
                <TableCell align="right">{row.Number_of_Lamps}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
