import { useState, useEffect } from "react";
import { CircularProgress, Divider } from "@mui/material";
import imageType from "constants/image_type";
import OptimizedInstallation from "components/shared/optimizedInstallation";
import LampInstallationProps from "./types";
import Image from "components/shared/image/images";
import CoilCard from "../coilCard";

import styles from "../../feature/lamp_installation/lamp_installation.module.scss";

const LampInstallation = ({
  images,
  isLoading,
}: LampInstallationProps): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(isLoading);
  const [image, setImage] = useState<any[]>([]);
  const [coilStructure, setCoilStructure] = useState<any[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [lampSideView, setLampSideView] = useState<object>(undefined);

  const assignImages = async (): Promise<void> => {
    try {
      const api_data = images;
      if (api_data["images"]) {
        setImage([api_data["images"]["Optimal Lamps Arrangement"]]);
        if (api_data["coil_installation"]) {
          const newArr = [];
          for (
            let i = 1;
            i <= Object.keys(api_data["coil_installation"]).length;
            i++
          ) {
            newArr.push({
              modal: api_data["coil_installation"][`Lamp L ${i}`][0],
              leftX: api_data["coil_installation"][`Lamp L ${i}`][1],
              leftY: api_data["coil_installation"][`Lamp L ${i}`][2],
              num: i,
            });
          }
          setCoilStructure(newArr);
          setLampSideView(api_data["lamp_side_view"]);
        }
        setLoading(false);
      } else {
        setLoading(false);
        setError(true);
        setErrorMessage(api_data);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      setErrorMessage(error.toString());
    }
  };

  useEffect(() => {
    assignImages();
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

  return (
    <div className={styles.container}>
      <p className={styles.title}>Installation</p>
      {errorMessage === "" && ShowErrorMessage()}
      {coilStructure.length && (
        <div className={styles.cards}>
          {coilStructure.map((elem) => {
            return <CoilCard key={elem.num} data={elem} />;
          })}
        </div>
      )}
      {coilStructure.length > 0 && <hr className={styles.divider} />}
      {loading ? (
        <div className={styles.loading}>
          <CircularProgress />
        </div>
      ) : (
        image?.[0] && (
          <Image
            id="images"
            className={styles.images}
            src={`${imageType},${image[0]}`}
            width={500}
            height={600}
            alt=""
          />
        )
      )}
      {lampSideView && (
        <Image
          id="images"
          className={styles.images}
          src={`${imageType},${lampSideView}`}
          width={600}
          height={1000}
          alt="lamp side view"
        />
      )}
    </div>
  );
};

export default LampInstallation;
