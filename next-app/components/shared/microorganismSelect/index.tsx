import { MenuItem, Select } from "@mui/material";
import { MicroOrganisms } from "../selectMicroorganism/types";
import { IMicroOrganismsSelectProps } from "./types";

import styles from "./microorganismSelect.module.scss";

export const MicroOrganismsSelect: React.FC<IMicroOrganismsSelectProps> = ({
  handleMicroorganismOption,
  handleSusceptibilityCoefficient,
  tableStateValues,
}) => {
  return (
    <div className={styles.container}>
      <h4 id="form_label">Target Microorganisms</h4>
      <Select
        id="values"
        value={
          tableStateValues?.microorganismOption || [MicroOrganisms[0].name]
        }
        onChange={handleMicroorganismOption}
        multiple={handleSusceptibilityCoefficient ? false : true}
        className={styles.mobileSelect}
      >
        {MicroOrganisms.map((microOrganism) => (
          <MenuItem
            key={microOrganism.name}
            value={microOrganism.name}
            onClick={
              handleSusceptibilityCoefficient
                ? () => handleSusceptibilityCoefficient(microOrganism.sum)
                : () => {}
            }
          >
            {microOrganism.name}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};
