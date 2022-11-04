import ErrorMessageProps from "./types";

const ShowErrorMessage = ({
  error,
  errorMessage,
}: ErrorMessageProps): JSX.Element => {
  return (
    <div className="error" style={{ display: error ? "" : "none" }}>
      <p className="error-message">* {errorMessage}</p>
    </div>
  );
};

export default ShowErrorMessage;
