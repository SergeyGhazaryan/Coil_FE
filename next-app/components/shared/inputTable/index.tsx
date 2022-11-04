import { useEffect } from "react";
import InputTableProps from "../../../components/shared/inputTable/types";

import styles from "../../../components/shared/inputTable/inputTable.module.scss";

const InputTable = ({ children, name }: InputTableProps): JSX.Element => {

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h5 className={styles.name}>{name}</h5>
        <h5 className={styles.value}>Value</h5>
      </div>
      <div className={styles.children}> {children}</div>
    </div>
  );
};
export default InputTable;
