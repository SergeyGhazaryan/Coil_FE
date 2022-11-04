export interface ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  handleClick?: (e) => any;
  disabled?: boolean;
  page?: number;
}
