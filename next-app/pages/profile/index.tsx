import EditAccount from "components/feature/profile";
import with_auth from "src/context/auth_context";

const InputParametersPage = (): JSX.Element => {
  return <EditAccount />;
};
export default with_auth(InputParametersPage);
