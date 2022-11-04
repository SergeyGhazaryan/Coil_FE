import { ImageProps as NextImageProps } from "next/image";

export default interface ImageProps extends NextImageProps {
  onclick?: () => void;
  alt?: string;
  id?: string;
  className?: string;
  width?: number;
  height?: number;
  src: string;
}
