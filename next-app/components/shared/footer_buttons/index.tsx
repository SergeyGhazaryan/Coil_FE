import Button from "../button";
import { IFooterButtonsProps } from "./types";

import styles from "./footerButtons.module.scss";

export const FooterButtons: React.FC<IFooterButtonsProps> = ({
  page,
  handlePreviousPage,
  handleNextPage,
  handleCalculate,
  disabled,
}) => {
  return (
    <>
      {page <= 2 && (
        <div className={styles.root}>
          {page === 2 && (
            <Button
              className={styles.previous_button}
              handleClick={handlePreviousPage}
              text="Back"
            />
          )}
          <Button
            className={styles.next_button}
            handleClick={page !== 2 ? handleNextPage : handleCalculate}
            text="Next"
            disabled={disabled}
            page={page}
          />
        </div>
      )}
    </>
  );
};
