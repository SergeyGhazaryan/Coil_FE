import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import OptimizedInstallationProps from "./types";

import styles from "../../../components/shared/optimize/optimize.module.scss";

const optimizeData = (data) => {
  const sortable = Object.fromEntries(
    Object.entries(data).sort(
      ([a], [b]) =>
        Number(a.replace("Lamp L", "")) - Number(b.replace("Lamp L", ""))
    )
  );

  const headers = Object.keys(sortable);
  headers.unshift("Installation");
  const values = Object.values(sortable);

  var rows: Array<Array<string>> = [
    ["Lamp model"],
    ["Lamp lower left end x , mm"],
    ["Lamp lower left end y, mm "],
  ];

  rows = rows.map((val: string[], index: number) => [
    val,
    ...values.map((x) => x[index]),
  ]);
  return { headers, rows };
};

export default function OptimizedInstallation({
  data,
}: OptimizedInstallationProps) {
  const optimize_data = optimizeData(data);

  return (
    <>
      <p className={styles.table_title}>Proposed lamp configurations</p>
      {data ? (
        <>
          {" "}
          <TableContainer component={Paper}>
            <Table
              className={styles.table}
              aria-label="simple table"
            >
              <TableHead  className={styles.tableHead}>
                <TableRow>
                  {optimize_data?.headers.map((header, index) => (
                    <TableCell
                      key={index}
                      className={styles.tableHeadCell}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {optimize_data?.rows.map((row, index) => (
                  <TableRow
                    key={index}
                    className={styles.tableRow}
                  >
                    {row.map((val, index) => (
                      <TableCell key={index} component="th" scope="row">
                        {val}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
