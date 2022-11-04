import { useRouter } from "next/router";
import RecoveryPassword from "../../components/feature/recoveryPassword";
import ForgotPassword from "components/feature/forgotPassword";

const RecoveryPasswordPage = (): JSX.Element => {
  const rout = useRouter();
  const query = rout.query;

  if (query.requestPassword === "true") return <ForgotPassword />;
  else if (query.emailVerificationToken)
    return <RecoveryPassword token={query.emailVerificationToken} />;
  return <ForgotPassword />;
};

export default RecoveryPasswordPage;
