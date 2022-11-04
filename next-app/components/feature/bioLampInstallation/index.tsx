import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import imageType from "constants/image_type";
import LampInstallationProps from "./types";
import Image from "components/shared/image/images";
import Card from "../card";

import styles from "../../feature/bioLampInstallation/lamp_installation.module.scss";

const BioLampInstallation = ({
  images,
  isLoading,
  tableValues,
}: LampInstallationProps): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(isLoading);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [data, setData] = useState([]);
  
  useEffect(() => {
    if (tableValues[9].length == 0) {
      const newArr = [];
      for (let i = 1; i <= tableValues[5][0].Number_of_Lamps; i++) {
        newArr.push({
          num: i,
          modal: tableValues[5][0].Model_Name,
          layer: i,
          xCoord: images.tables_data.xy_coordinates_layers[0][0].x0[i - 1],
          yCoord: images.tables_data.xy_coordinates_layers[0][0].y0[i - 1],
        });
      }
      setData(newArr);
    } else {
      const newArr = [];
      for (let i = 1; i <= tableValues[9].length; i++) {
        newArr.push({
          num: i,
          modal: tableValues[9][i - 1].ModelName,
          layer: tableValues[9][i - 1].LayerNumber,
          xCoord: images.tables_data.xy_coordinates_layers[i - 1][0].x0[0],
          yCoord: images.tables_data.xy_coordinates_layers[i - 1][0].y0[0],
        });
      }
      setData(newArr);
    }
  }, []);

  useEffect(() => {
    setLoading(isLoading);
  }, []);

  const ShowErrorMessage = (): JSX.Element => {
    return (
      <div className="error" style={{ display: error ? "" : "none" }}>
        <h4 className={styles.errorMessage}>* {errorMessage}</h4>
      </div>
    );
  };

  const returnImages = (): JSX.Element => {
    return (
      <>
        {loading ? (
          <div className={styles.loading}>
            <CircularProgress />
          </div>
        ) : (
          <>
            {
              <Image
                id="images"
                className={styles.images}
                src={`${imageType},${images.graphs[0]["lamps_locations_layers"][0].Layer_0_locations_layers}`}
                width={500}
                height={600}
                alt="img"
              />
            }
          </>
        )}
      </>
    );
  };

  return (
    <>
      <p className={styles.title}>Installation</p>
      {errorMessage === "" && ShowErrorMessage()}
      {loading ? (
        <div className={styles.loading}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className={styles.cards}>
            {data.map((elem) => (
              <Card key={elem.num} data={elem} />
            ))}
          </div>
          <hr className={styles.divider} />
          <>
            <div className={styles.graph}>{returnImages()}</div>
          </>
        </>
      )}
    </>
  );
};

export default BioLampInstallation;
