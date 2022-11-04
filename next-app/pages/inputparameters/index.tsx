import Input from "components/feature/inputParameters";
import with_auth from "src/context/auth_context";

const InputParametersPage = (): JSX.Element => {
  return <Input />;
};
export default with_auth(InputParametersPage)
