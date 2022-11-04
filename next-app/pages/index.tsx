import React from "react";
import Input from "../components/feature/inputParameters";
import with_auth from "../src/context/auth_context";

function Home(): JSX.Element {
  return <Input />;
}

export default with_auth(Home);
