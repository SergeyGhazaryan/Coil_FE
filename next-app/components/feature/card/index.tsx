import React from "react";

import styles from "./card.module.scss";
import CardTypes from "./types";

const Card = ({ data }: CardTypes) => {
  return (
    <div className={styles.card}>
      <div className={styles.left}>
        <span className={styles.install}>
          <p className={styles.lamp}>Lamp {data.num}</p>
          <p>Installation</p>
        </span>
        <span className={styles.data}>
          <p className={styles.model}>Modal name</p>
          <p>Lamp Layer Number</p>
          <p>Yo coordinate</p>
          <p>Xo coordinate</p>
        </span>
      </div>
      <div className={styles.right}>
        <p>{data.modal}</p>
        <p>{data.layer}</p>
        <p>{data.xCoord}</p>
        <p>{data.yCoord}</p>
      </div>
    </div>
  );
};

export default Card;
