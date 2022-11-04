import { useState } from "react";
import { useRouter } from "next/router";
import { CircularProgress, FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
import { validatePassword, checkEquality } from "../../../helpers/validation";
import navBarPaths from "../../../constants/navBarPaths";
import ShowErrorMessage from "../../../components/shared/error_message";
import { recoveryPassword } from "services/authService";
import Image from "components/shared/image/images";
import Button from "components/shared/button";
import { imagesPaths } from "helpers/ImagesPaths";

import styles from "../../../components/feature/recoveryPassword/recoveryPassword.module.scss";

const RecoveryPassword = (props): JSX.Element => {
  const router = useRouter();
  
  const [newPassword, setNewPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [conformPassword, setConformPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [newPassMessage, setNewPassMessage] = useState<string>("");
  const [confirmPasswordMessage, setConfirmPasswordMessage] =
    useState<string>("");

  const handleNewPassword = (e): void => {
    setNewPassword(e.target.value);
  };

  const handleConformPassword = (e): void => {
    setConformPassword(e.target.value);
  };

  const toLogin = (): void => {
    router.push(navBarPaths.login);
  };

  const handleSubmit = async (e): Promise<void> => {
    e.preventDefault();
    setNewPassMessage("");
    setConfirmPasswordMessage("");

    if (!validatePassword(newPassword)) {
      setNewPassMessage(
        "Password must be 8 to 15 characters, lowercase and uppercase letters, special character"
      );
    } else if (!checkEquality(newPassword, conformPassword)) {
      setConfirmPasswordMessage("Re enter correct password");
    } else {
      setLoading(true);
      const resRecovery = await recoveryPassword(newPassword, props["token"]);
      if (resRecovery) {
        setLoading(false);
        setError(true);
        setErrorMessage("Password changed successfully");
        router.push(navBarPaths.login);
      } else {
        setError(true);
        setErrorMessage("Your request url is expired!");
        setLoading(false);
      }
    }
  };

  return (
    <div className={styles.edit_container}>
      <div className={styles.backButton} onClick={toLogin}>
        <Image
          width={40}
          height={40}
          src={imagesPaths.backArrow}
          className={styles.backIcon}
          alt="back"
        />
        <p>Back</p>
      </div>
      <FormControl onSubmit={handleSubmit} className={styles.edit_account}>
        <h1 className={styles.title}>Recover password</h1>
        {ShowErrorMessage({ error, errorMessage })}
        <div className={styles.field}>
          <TextField
            className={styles.inputs}
            InputLabelProps={{
              className: styles.inputLabel,
            }}
            FormHelperTextProps={{
              className: styles.errorMessage,
            }}
            label="New password"
            type="password"
            helperText={newPassMessage}
            onChange={handleNewPassword}
            value={newPassword}
          />
        </div>

        <div className={styles.field}>
          <TextField
            className={styles.inputs}
            InputLabelProps={{
              className: styles.inputLabel,
            }}
            FormHelperTextProps={{
              className: styles.errorMessage,
            }}
            type="password"
            label="Retype password"
            helperText={confirmPasswordMessage}
            onChange={handleConformPassword}
            value={conformPassword}
          />
        </div>
        {loading && <CircularProgress />}
        <div className={styles.saveButtonConatiner}>
          <Button
            text={"Change password"}
            className={styles.save}
            type="submit"
            handleClick={handleSubmit}
          />
        </div>
      </FormControl>
    </div>
  );
};
export default RecoveryPassword;
