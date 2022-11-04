import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { FakeData, DataTableProps } from "../../../utils/constants/fakeData";

import styles from "../../../components/shared/dataTable/dataTable.module.scss";

export const DataTable = ({
  data,
  width,
  tableName,
  firstArgument,
  secondArgument,
  className,
  rowOne,
  rowTwo,
  rowThree,
  id,
}: DataTableProps): JSX.Element => {
  return (
    <TableContainer
      component={Paper}
      className={styles.tableContainer}
    >
      <Table
        id={id}
        aria-label="simple table"
        className={styles.table}
      >
        <TableHead className={styles.tableHead}>
          <TableRow className={styles.tableHeadRow}>
            <TableCell className={styles.tableColumn}>{tableName}</TableCell>
            <TableCell align="right" className={styles.tableColumn}>
              {firstArgument}
            </TableCell>
            <TableCell align="right" className={styles.tableColumn}>
              {secondArgument}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: FakeData) => (
            <TableRow className={styles.rowName} key={rowOne || row.name}>
              <TableCell component="th" scope="row" className={styles.tableRow}>
                {row[rowOne] || row.name}
              </TableCell>
              <TableCell align="right" className={styles.tableRow}>
                {row[rowTwo] || row.calories}
              </TableCell>
              <TableCell align="right" className={styles.tableRow}>
                {row[rowThree] || row.fat}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
