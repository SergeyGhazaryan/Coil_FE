import localStorageKeys from "constants/localStorageKeys";
import { useRouter } from "next/router";
import { getItemFromLocalStorage } from "services/localStorageService";
import navBarPaths from "../../constants/navBarPaths";

const with_auth = (WrappedComponent) => {
  return (props) => {
    if (typeof window !== "undefined") {
      const router = useRouter();
      const access_token = getItemFromLocalStorage(localStorageKeys.token)

      if (!access_token) {
        router.replace(navBarPaths.login);
        return null;
      }
      return <WrappedComponent {...props} />;
    }
    return null;
  };
};

export default with_auth;
