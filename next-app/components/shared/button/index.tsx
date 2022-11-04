import { ButtonProps } from "./types";

const Button = ({
  text,
  handleClick,
  type,
  className,
  disabled,
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={className}
      onClick={handleClick}
      type={type}
      disabled={disabled}
      style={
        disabled && (text === "Next" || text === "Save")
          ? { background: "rgb(192,192,192" }
          : {}
      }
    >
      {text}
    </button>
  );
};

export default Button;
