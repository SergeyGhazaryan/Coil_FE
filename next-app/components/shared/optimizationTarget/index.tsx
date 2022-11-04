import { OptimizationTarget as target } from "../../../components/shared/optimizationTarget/types";
import OptimizationTargetProps from "../../../components/shared/optimizationTarget/types";

import styles from "../../../components/shared/optimizationTarget/optimizationTarget.module.scss";

const OptimizationTarget = ({
  on: handleChangePermission,
  checked,
}: OptimizationTargetProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Choose optimization target</h4>
      <div className={styles.checkbox}>
        <label>
          <input
            type="radio"
            value={target.MicroOrganism}
            checked={checked}
            name="target"
            onClick={handleChangePermission}
          />
          {target.MicroOrganism}
        </label>
        <label>
          <input
            type="radio"
            value={target.Intensity}
            checked={!checked}
            name="target"
            onClick={handleChangePermission}
          />
          {target.Intensity}
        </label>
      </div>
    </div>
  );
};

export default OptimizationTarget;
