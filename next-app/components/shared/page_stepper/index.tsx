import { Step, StepLabel, Stepper } from "@mui/material";
import { IPageStepperProps, stepperLabels } from "./types";

import styles from "./pageStepper.module.scss";

export const PageStepper: React.FC<IPageStepperProps> = ({ page }) => {
  return (
    <>
      {page <= 3 && (
        <Stepper
          activeStep={page - 1}
          alternativeLabel
          className={styles.stepper}
        >
          {stepperLabels.map((label) => (
            <Step key={label.name}>
              <StepLabel
                StepIconProps={{
                  classes: {
                    text: styles.text,
                    active: styles.text,
                    completed: styles.text,
                  },
                }}
              >
                {label.name}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      )}
    </>
  );
};
