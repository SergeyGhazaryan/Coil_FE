import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import router from "next/router";
import { signupByGoogle } from "services/authService";
import env from "constants/env";

interface SignUpGoogleProps {
  setError: Function;
}

const SignUpWithGoogle = ({ setError }: SignUpGoogleProps): JSX.Element => {
  const clientId = env.googleAppId;

  const handleSignup = async (googleData: {
    [x: string]: any;
  }): Promise<void> => {
    const isLogged = await signupByGoogle(googleData["credential"]);

    if (isLogged) {
      router.push("/");
    } else {
      setError("Mail already registered!");
    }
  };
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin onSuccess={handleSignup} text={"signup_with"} />
    </GoogleOAuthProvider>
  );
};

export default SignUpWithGoogle;
