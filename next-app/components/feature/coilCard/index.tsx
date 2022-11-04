import React from "react";

import styles from "./card.module.scss";
import CardTypes from "./types";

const CoilCard = ({ data }: CardTypes) => {
  return (
    <div className={styles.card}>
      <div className={styles.left}>
        <span className={styles.install}>
          <p className={styles.lamp}>Lamp L{data.num}</p>
          <p>Installation</p>
        </span>
        <span className={styles.data}>
          <p className={styles.model}>Lamp Model</p>
          <p>Lamp lower left en x, mm</p>
          <p>Lamp lower left end y, mm</p>
        </span>
      </div>
      <div className={styles.right}>
        <p>{data.modal}</p>
        <p>{data.leftX}</p>
        <p>{data.leftY}</p>
      </div>
    </div>
  );
};

export default CoilCard;
