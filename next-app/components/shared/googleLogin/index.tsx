import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import router from "next/router";
import { loginByGoogle } from "services/authService";
import { GoogleLoginProps } from "./types";

const LoginWithGoogle = ({ btnText }: GoogleLoginProps): JSX.Element => {
  const clientId = process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_ID;

  const handleLogin = async (googleData: {
    [x: string]: any;
  }): Promise<void> => {
    const isLogged = await loginByGoogle(googleData["credential"]);

    if (isLogged) {
      router.push("/");
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin onSuccess={handleLogin} text={btnText} />
    </GoogleOAuthProvider>
  );
};

export default LoginWithGoogle;
