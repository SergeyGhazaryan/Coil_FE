import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { DataTableProps } from "../../../utils/constants/fakeData";
import { MicroOrganisms } from "../selectMicroorganism/types";

import styles from "./microorganisms.module.scss";

export const MicroOrganismsTable = ({
  data,
  width,
  tableName,
  firstArgument,
  secondArgument,
  className,
  inactivationRate,
}: DataTableProps): JSX.Element => {
  
  return (
    <TableContainer
      component={Paper}
      sx={{ margin: "60px 0px", width: { width } }}
      classes={{ root: className }}
    >
      <Table
        sx={{
          width: { width },
          border: "1px solid #BCBEC0",
        }}
        aria-label="simple table"
      >
        <TableHead className={styles.tableHead}>
          <TableRow className={styles.tableHeadRow}>
            <TableCell className={styles.tableHeadCell}>{tableName}</TableCell>
            <TableCell align="right" className={styles.tableHeadCell}>
              {firstArgument}
            </TableCell>
            <TableCell align="right" className={styles.tableHeadCell}>
              {secondArgument}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: string, index: number) => (
            <TableRow key={row} className={styles.tableRow}>
              <TableCell
                component="th"
                scope="row"
                className={styles.tableHeadRow}
              >
                {row}
              </TableCell>
              {inactivationRate ? (
                <>
                  <TableCell align="right">
                    {inactivationRate[index][0]}
                  </TableCell>
                  <TableCell align="right" className={styles.tableHeadRow}>
                    {inactivationRate[index][1]}
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell align="right" className={styles.tableHeadRow}>
                    {MicroOrganisms[index].sum}
                  </TableCell>
                  <TableCell align="right" className={styles.tableHeadRow}>
                    m2/j
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
