import { useRouter } from "next/router";
import BiowallEditPage from "components/feature/Biowall_edit";
import ReportEditParameters from "components/feature/Coil_edit";
import with_auth from "src/context/auth_context";
import { ReportTypes } from "helpers/defaultInputValues";

const ReportEditPage = (): JSX.Element => {
  const { type } = useRouter().query;

  return type === ReportTypes.COILCLEAN ? <ReportEditParameters /> : <BiowallEditPage />;
};

export default with_auth(ReportEditPage);
