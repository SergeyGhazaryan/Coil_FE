import { useState } from "react";
import { useRouter } from "next/router";
import { CircularProgress, FormControl, FormHelperText, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { validatePassword, checkEquality } from "../../../helpers/validation";
import navBarPaths from "../../../constants/navBarPaths";
import Image from "components/shared/image/images";
import ShowErrorMessage from "../../../components/shared/error_message";
import { changePassword } from "services/authService";
import Button from "components/shared/button";
import { imagesPaths } from "helpers/ImagesPaths";

import styles from "../../../components/feature/change_password/change_password.module.scss";

const ChangePassword = (): JSX.Element => {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [conform_password, setConform_password] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(true);
  const [showRePassword, setShowRePassword] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [newPassMessage, setNewPassMessage] = useState<string>("");
  const [conformPasswordMessage, setConformPasswordMessage] =
    useState<string>("");

  const handleNewPassword = (e): void => {
    setNewPassword(e.target.value);
  };

  const handleConformPassword = (e): void => {
    setConform_password(e.target.value);
  };

  const handleOldPassword = (e): void => {
    setOldPassword(e.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleClickShowRePassword = () => {
    setShowRePassword(!showRePassword);
  };

  const handleGoBack = (): void => {
    router.push(navBarPaths.profile);
  };

  const handleSubmit = async (e): Promise<void> => {
    e.preventDefault();
    setNewPassMessage("");
    setConformPasswordMessage("");

    if (!validatePassword(newPassword)) {
      setNewPassMessage(
        "Password must be 8 to 15 characters, lowercase and uppercase letters, special character"
      );
    } else if (!checkEquality(newPassword, conform_password)) {
      setConformPasswordMessage("Re enter correct password");
    } else {
      setLoading(true);
      const isChanged = await changePassword(newPassword);
      if (isChanged?.message === "Password chaged succesfuly") {
        setLoading(false);
        setError(true);
        setErrorMessage("Password chaged succesfuly");
        router.push(navBarPaths.profile);
      } else {
        setError(true);
        setErrorMessage(isChanged.toString());
        setLoading(false);
      }
    }
  };

  return (
    <div className={styles.edit_container}>
      <div className={styles.backButton} onClick={handleGoBack}>
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
        <h1 className={styles.title}>Change password</h1>
        {ShowErrorMessage({ error, errorMessage })}

        {/* <div className={styles.field}>
          <p>Old password</p>
          <OutlinedInput
            value={oldPassword}
            type={!showPassword ? "text" : "password"}
            onChange={handleOldPassword}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            className={styles.oldPassword}
            placeholder="Old password"
            sx={{
              '& legend': { display: 'none' },
              '& fieldset': { top: 0 },
            }}
          />
        </div> */}

        <div className={styles.field}>
          <p>New password</p>
          <OutlinedInput
            value={newPassword}
            type={!showNewPassword ? "text" : "password"}
            placeholder="New password"
            onChange={handleNewPassword}
            inputProps={{
              'aria-label': 'weight',
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowNewPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            sx={{
              '& legend': { display: 'none' },
              '& fieldset': { top: 0 },
            }}
            className={styles.oldPassword}
          />
          <FormHelperText error id="accountId-error">
            <span>{newPassMessage}</span>
          </FormHelperText>
        </div>

        <div className={styles.field}>
          <p>Retype new password</p>
          <OutlinedInput
            value={conform_password}
            type={!showRePassword ? "text" : "password"}
            placeholder="Retype new password"
            onChange={handleConformPassword}
            inputProps={{
              'aria-label': 'weight',
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowRePassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            sx={{
              '& legend': { display: 'none' },
              '& fieldset': { top: 0 },
            }}
            className={styles.oldPassword}
          />
          <FormHelperText error id="accountId-error">
            <span>{conformPasswordMessage}</span>
          </FormHelperText>
        </div>
        {loading && <CircularProgress />}
        <div className={styles.containerButton}>
          <Button
            text={"Save Changes"}
            className={styles.save}
            type="submit"
            handleClick={handleSubmit}
          />
        </div>
      </FormControl>
    </div>
  );
};
export default ChangePassword;
