import { MicroOrganisms } from "../../../components/shared/selectMicroorganism/types";

import styles from "../../../components/shared/selectMicroorganism/selectMicroorganism.module.scss";

const SelectMicroOrganism = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <h4>Target Microorganism</h4>
      <select name="microOrganism">
        {MicroOrganisms.map((microOrganism, index) => {
          return (
            <option key={index} value={microOrganism.name}>
              {microOrganism.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default SelectMicroOrganism;
