import NextImage from "next/image";
import ImageProps from "./types";

import styles from "./img.module.scss";

const Image = ({
  onclick,
  alt,
  id,
  className,
  width,
  height,
  src,
  ...rest
}: ImageProps): JSX.Element => {
  return (
    <div className={className}>
      <NextImage
        width={width}
        height={height}
        src={src}
        className={styles.img}
        id={id}
        onClick={onclick}
        draggable="false"
        {...rest}
      />
    </div>
  );
};
export default Image;
