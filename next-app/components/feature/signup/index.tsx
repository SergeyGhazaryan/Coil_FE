import { useRouter } from "next/router";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { CircularProgress, FormControl } from "@mui/material";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { signup } from "services/authService";
import SignUpWithGoogle from "components/shared/googleSignUp";
import navBarPaths from "../../../constants/navBarPaths";
import Button from "../../../components/shared/button";
import {
  validateEmail,
  validatePassword,
  validateLength,
} from "../../../helpers/validation";

import styles from "../../../components/feature/signup/signup.module.scss";

const Signup = (): JSX.Element => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [conformPassword, setConformPassword] = useState<string>("");
  const [role, setRole] = useState<string>("1");
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [nameMessage, setNameMessage] = useState<string>("");
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const [emailMessage, setEmailMessage] = useState<string>("");
  const [confirmPassMessage, setConfirmPassMessage] = useState<string>("");
  const [showPass, setShowPass] = useState<boolean>(false);
  const [repeatPass, setRepeatPass] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConformPassword = (e) => {
    setConformPassword(e.target.value);
  };

  const handleRole = (e) => {
    setRole("0");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setNameMessage("");
    setEmailMessage("");
    setPasswordMessage("");
    setConfirmPassMessage("");

    if (!validateLength(4, 20, name)[0]) {
      setNameMessage(
        "* name should not be less than 4 or greater than 8 character"
      );
    } else if (!validateEmail(email)) {
      setEmailMessage("Enter valid email address");
    } else if (!validatePassword(password)) {
      setPasswordMessage(
        "* Password must be 8 to 15 characters, lowercase and uppercase letters, special character"
      );
    } else if (password != conformPassword) {
      setConfirmPassMessage("* Re enter correct password");
    } else {
      setLoading(true);
      const isRegistered = await signup(email, password, name, role);
      if (isRegistered.token && isRegistered.token !== "") {
        router.push(navBarPaths.inputPage);
        setLoading(false);
      } else {
        setError(true);
        setErrorMessage(isRegistered.toString());
        setLoading(false);
      }
    }
  };

  return (
    <div className={styles.signUpContainer}>
      <div className={styles.signup}>
        <h1 className={styles.title}>Sign up</h1>
        <h4 className={styles.errorMessage}>{` ${errorMessage}`}</h4>
        <FormControl className={styles.form}>
          <div className={styles.field}>
            <label>Name</label>
            <TextField
              FormHelperTextProps={{
                className: styles.errorMessage,
              }}
              inputProps={{
                className: styles.inputFieldProps,
              }}
              required
              placeholder="Name"
              helperText={nameMessage}
              onChange={handleName}
              value={name}
              className={styles.inputField}
            />
          </div>

          <div className={styles.field}>
            <label>Email</label>
            <TextField
              FormHelperTextProps={{
                className: styles.errorMessage,
              }}
              inputProps={{
                className: styles.inputFieldProps,
              }}
              required
              placeholder="Email"
              helperText={emailMessage}
              onChange={handleEmail}
              value={email}
              className={styles.inputField}
            />
          </div>

          <div className={styles.field}>
            <label>Password</label>
            <TextField
              FormHelperTextProps={{
                className: styles.errorMessage,
              }}
              inputProps={{
                className: styles.inputFieldProps,
              }}
              required
              placeholder="Password"
              type={showPass ? "text" : "password"}
              helperText={passwordMessage}
              onChange={handlePassword}
              value={password}
              className={styles.pass_inp}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {" "}
                    {showPass ? (
                      <VisibilityOutlinedIcon
                        onClick={() => setShowPass(!showPass)}
                        className={styles.cursor_pointer}
                      />
                    ) : (
                      <VisibilityOffOutlinedIcon
                        onClick={() => setShowPass(!showPass)}
                        className={styles.cursor_pointer}
                      />
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <div className={styles.field}>
            <label>Re-type password</label>
            <TextField
              FormHelperTextProps={{
                className: styles.errorMessage,
              }}
              inputProps={{
                className: styles.inputFieldProps,
              }}
              type={repeatPass ? "text" : "password"}
              placeholder="Re-type password"
              required
              className={styles.inputField}
              helperText={confirmPassMessage}
              onChange={handleConformPassword}
              value={conformPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {" "}
                    {repeatPass ? (
                      <VisibilityOutlinedIcon
                        onClick={() => setRepeatPass(!repeatPass)}
                        className={styles.cursor_pointer}
                      />
                    ) : (
                      <VisibilityOffOutlinedIcon
                        onClick={() => setRepeatPass(!repeatPass)}
                        className={styles.cursor_pointer}
                      />
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <div className={styles.Adminbox}>
            <input
              type="checkbox"
              onChange={handleRole}
              className={styles.cheackbox}
            />
            <label className={styles.label}>Admin</label>
          </div>
          <div className={styles.loading}>
            {loading && <CircularProgress />}
          </div>
          <Button
            className={styles.submit}
            handleClick={handleSubmit}
            text="Sign Up"
            type="submit"
          />
          <div className={styles.horizontal_div}>
            <h2 className={styles.horizontal}>
              <span>or</span>
            </h2>
          </div>
        </FormControl>
        <div className={styles.loginGoogle}>
          <SignUpWithGoogle setError={setErrorMessage} />
        </div>
        <div className={styles.loginLink}>
          <p className={styles.link}>
            Already have an account?{" "}
            <a
              href="/login"
              onClick={() => {
                router.push("/login");
              }}
            >
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
