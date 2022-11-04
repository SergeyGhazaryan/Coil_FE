import { useState } from "react";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";
import { TextField, FormControl } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import LoginWithGoogle from "components/shared/googleLogin";
import Button from "../../../components/shared/button";
import navBarPaths from "../../../constants/navBarPaths";
import { login } from "services/authService";

import styles from "../../../components/feature/login/login.module.scss";

const Login = (): JSX.Element => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPass, setShowPass] = useState<boolean>(false);

  const emptyInput = "Fill all empty fields";

  const handleEmail = (e): void => {
    setEmail(e.target.value);
    setError(false);
  };

  const handlePassword = (e): void => {
    setPassword(e.target.value);
    setError(false);
  };

  const handleSubmit = async (e): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    if (email && password) {
      const isLogged: any = await login(email, password);
      if (isLogged.token && isLogged.token !== "") {
        router.push(navBarPaths.inputPage);
      } else {
        setLoading(false);
        setError(true);
        setErrorMessage(isLogged);
      }
    } else {
      setLoading(false);
      setError(true);
      setErrorMessage(emptyInput);
    }
  };

  const ShowErrorMessage = (): JSX.Element => {
    return (
      <div className="error" style={{ display: error ? "" : "none" }}>
        <h4 className={styles.errorMessage}>* {errorMessage}</h4>
      </div>
    );
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.login}>
        <h1 className={styles.title}>Login</h1>
        {ShowErrorMessage()}
        <FormControl className={styles.form}>
          <div className={styles.field}>
            <label>Email</label>
            <TextField
              FormHelperTextProps={{
                className: styles.errorMessage,
              }}
              required
              placeholder="Email"
              onChange={handleEmail}
              value={email}
              sx={{
                "& fieldset":
                  (errorMessage === emptyInput && !email) ||
                  (errorMessage !== emptyInput && error)
                    ? {
                        borderColor: "#f02849 !important",
                      }
                    : {},
              }}
            />
          </div>
          <div className={styles.field}>
            <label>Password</label>
            <TextField
              FormHelperTextProps={{
                className: styles.errorMessage,
              }}
              type={showPass ? "text" : "password"}
              required
              placeholder="Password"
              onChange={handlePassword}
              value={password}
              sx={{
                "& fieldset":
                  (errorMessage === emptyInput && !password) ||
                  (errorMessage !== emptyInput && error)
                    ? {
                        borderColor: "#f02849 !important",
                      }
                    : {},
              }}
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
          <div className={styles.loading}>
            {loading && <CircularProgress />}
          </div>
          <Button
            text={"Login"}
            className={styles.submit}
            type="submit"
            handleClick={handleSubmit}
          />
          <div className={styles.horizontal_div}>
            <h2 className={styles.horizontal}>
              <span>or</span>
            </h2>
          </div>
        </FormControl>
        <div className={styles.loginGoogle}>
          <LoginWithGoogle btnText="signin_with" />
        </div>
        <div className={styles.signupLink}>
          <p className={styles.link}>
            Don't have an account yet?
            <a
              href="/signup"
              onClick={() => {
                router.push("/signup");
              }}
              className={styles.link}
            >
              {" "}
              Sign up here
            </a>
          </p>
        </div>
        <div className={styles.signupLink}>
          <p className={styles.link}>
            Forgot your password?
            <a
              href="/recoveryPassword?requestPassword=true"
              onClick={() => {
                router.push("/recoveryPassword?requestPassword=true");
              }}
              className={styles.link}
            >
              {" "}
              Recovery here.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
