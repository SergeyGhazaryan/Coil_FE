import { LampPositionTarget as target } from "../../../components/shared/lampPosition/types";
import LampPositionProps from "../../../components/shared/lampPosition/types";

import styles from "../../../components/shared/lampPosition/lampPosition.module.scss";

const LampPosition = ({
  on: handleChangePermission,
  checked,
}: LampPositionProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>
        Choose lamp position in relation to the coil
      </h4>
      <div className={styles.checkbox}>
        <label>
          <input
            type="radio"
            value={target.MicroOrganism}
            checked={checked}
            name="positon"
            onClick={handleChangePermission}
          />
          {target.MicroOrganism}
        </label>
        <label>
          <input
            type="radio"
            value={target.Intensity}
            checked={!checked}
            name="position"
            onClick={handleChangePermission}
          />
          {target.Intensity}
        </label>
      </div>
    </div>
  );
};

export default LampPosition;
