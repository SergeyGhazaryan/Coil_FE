import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { CircularProgress, FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
import navBarPaths from "../../../constants/navBarPaths";
import ShowErrorMessage from "../../../components/shared/error_message";
import { forgotPassword } from "services/authService";
import Image from "components/shared/image/images";
import Button from "components/shared/button";
import { imagesPaths } from "helpers/ImagesPaths";

import styles from "../../../components/feature/forgotPassword/forgotPassword.module.scss";

const ForgotPassword = (): JSX.Element => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [buttonDisable, setButtonDisable] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(30);

  const handleChangeMail = (e): void => {
    setEmail(e.target.value);
  };

  const toLogin = (): void => {
    router.push(navBarPaths.login);
  };

  const handleSubmit = async (e): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    if (!email) setErrorMessage("Email filed is empty!");
    const resEmail = await forgotPassword(email);

    if (resEmail.message) {
      setLoading(false);
      setError(true);
      setErrorMessage(resEmail.message);
      setButtonDisable(true);
      setTimeout(() => setButtonDisable(false), 30000);
      setSeconds(30);
    } else {
      setError(true);
      setErrorMessage(resEmail);
      setLoading(false);
    }
  };

  const secondCounter = (): void => {
    if (buttonDisable) {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }
  };

  useEffect(() => {
    let myInterval = setInterval(() => {
      secondCounter();
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

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

        <h1 className={styles.title}>Forgot password ? </h1>
        {ShowErrorMessage({ error, errorMessage })}
        <div className={styles.container}>
          <div className={styles.field}>
            <TextField
              sx={{
                width: "100%",
                "& .MuiInputBase-root": {
                  height: 55,
                  color: "#000",
                  marginBottom: "1rem",
                  backgroundColor: "#fff",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "#000",
                  fontWeight: "bold",
                  backgroundColor: "#fff",
                  borderRadius: "0.4rem",
                  padding: "0 0.4rem",
                },
              }}
              FormHelperTextProps={{
                className: styles.errorMessage,
              }}
              type="email"
              label="Email"
              onChange={handleChangeMail}
              value={email}
            />
          </div>
          <div className={styles.timerContainer}>
            {seconds !== 1 && buttonDisable && (
              <p>You can resend email after {seconds} seconds</p>
            )}
          </div>
          <div className={styles.loader}>{loading && <CircularProgress />}</div>
          <div className={styles.buttonContainer}>
            <Button text={"Recovery password"} className={buttonDisable ? styles.save : styles.saveDisabled} type="submit" handleClick={handleSubmit} />
          </div>
        </div>
      </FormControl>
    </div>
  );
};

export default ForgotPassword;
