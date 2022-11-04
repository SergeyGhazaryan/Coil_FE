import { useState, useEffect } from "react";
import { CircularProgress, Divider } from "@mui/material";
import {
  aspergillusForm,
  CoilWidthForm,
  minimumUvForm,
} from "utils/constants/fakeData";
import { DataTable } from "components/shared/dataTable";
import Image from "components/shared/image/images";
import { OptimizationTarget as target } from "../../../components/shared/optimizationTarget/types";
import imageType from "constants/image_type";
import ImagesProps, { IImages } from "./types";
import BiowallImages from "../biowall_images";
import { ReportTypes } from "helpers/defaultInputValues";

import styles from "../images/images.module.scss";

interface TableStatesArr {
  name: string;
  calories: number;
  fat: string;
}

const getCoilWidth = (CoilWidthForm, apiImages) => {
  if (!Object.values(apiImages).length) return CoilWidthForm;
  CoilWidthForm[0].calories = apiImages["data"][0][0];
  CoilWidthForm[1].calories = apiImages["data"][0][1];
  CoilWidthForm[2].calories = apiImages["data"][0][2];
  CoilWidthForm[3].calories = apiImages["data"][0][3];
  CoilWidthForm[4].calories = apiImages["data"][1][2];
  CoilWidthForm[5].calories = apiImages["data"][1][1];
  CoilWidthForm[6].calories = apiImages["data"][0][4];
  CoilWidthForm[7].calories = apiImages["data"][0][5];
  return CoilWidthForm;
};

const getMinimumUV = (uv_form, apiImages) => {
  if (!Object.values(apiImages).length) return uv_form;
  uv_form[0].calories = apiImages["data"][0][6];
  uv_form[1].calories = apiImages["data"][0][7];
  uv_form[2].calories = apiImages["data"][0][8];
  return uv_form;
};

const getAspergillus = (
  aspergillusForm,
  apiImages,
  required_inactivation_rate
) => {
  if (!Object.values(apiImages).length) return aspergillusForm;
  aspergillusForm[0].calories = required_inactivation_rate + "%" ?? "-";
  aspergillusForm[1].calories = apiImages["data"][1][6];
  aspergillusForm[2].calories = apiImages["data"][1][5];
  aspergillusForm[3].calories = apiImages["data"][2];
  return aspergillusForm;
};

const Images = ({
  images,
  isLoading,
  requiredInactivationRate,
  tableValues,
  reportType,
  tableStateValues,
}: ImagesProps): JSX.Element => {
  const [isMicroorganism, setIsMicroorganism] = useState<boolean>(true);
  const [CoilWidth, setCoilWidth] = useState<TableStatesArr[]>([]);
  const [minimumUv, setMinimumUv] = useState<TableStatesArr[]>([]);
  const [aspergillus, setAspergillus] = useState<TableStatesArr[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [image, setImage] = useState<{ [key: string]: string }[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const assignImages = async () => {
    try {
      const apiImages: IImages = images;
      try {
        setCoilWidth(getCoilWidth(CoilWidthForm, apiImages));
        setMinimumUv(getMinimumUV(minimumUvForm, apiImages));
        if (apiImages["data"][1][0] === target.MicroOrganism) {
          setIsMicroorganism(true);
          setAspergillus(
            getAspergillus(aspergillusForm, apiImages, requiredInactivationRate)
          );
        } else setIsMicroorganism(false);
      } catch (err) {
        console.log(err);
      }
      if (apiImages["images"]) {
        setImage([apiImages["images"]]);
        setLoading(false);
      } else {
        setLoading(false);
        setError(true);
        setErrorMessage(`${apiImages}`);
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
  }, [isLoading]);

  const ShowErrorMessage = (): JSX.Element => {
    return (
      <div className="error" style={{ display: error ? "" : "none" }}>
        <h4 className={styles.errorMessage}>* {errorMessage}</h4>
      </div>
    );
  };

  const returnImages = (key: string): JSX.Element => {
    return (
      <>
        {loading ? (
          <div className={styles.loading}>
            <CircularProgress />
          </div>
        ) : (
          <>
            {Object.values(image).length > 0 && image[0][key] && (
              <Image
                id="images"
                className={styles.images}
                src={`${imageType},${image[0][key]}`}
                width={500}
                height={600}
                alt="img"
              />
            )}
          </>
        )}
      </>
    );
  };

  return (
    <div className={styles.reportsContainer}>
      {reportType == ReportTypes.COILCLEAN ? (
        <>
          <h2 className={styles.heading}>Report Result</h2>
          {errorMessage === "" && ShowErrorMessage()}
          <div className={styles.container}>
            <div className={styles.row}>
              <div className={styles.column}>
                <DataTable
                  className={styles.firstColumn}
                  data={CoilWidth}
                  tableName="Dimensions and general information"
                  firstArgument="Value"
                  secondArgument="Measure"
                />
                {CoilWidth.length > 0 && <Divider />}
              </div>

              <div className={`${styles.column} ${styles.flex_center}`}>
                {returnImages("Coil Intensities")}
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.column}>
                <DataTable
                  data={minimumUv}
                  tableName="Coil surface UV Irradiation Inte..."
                  firstArgument="Value"
                  secondArgument="Measure"
                />
                {minimumUv.length > 0 && <Divider />}
              </div>

              <div className={`${styles.column} ${styles.flex_center}`}>
                {returnImages("Inactivation Time")}
              </div>
            </div>

            <div className={styles.row}>
              {isMicroorganism && (
                <div className={styles.column}>
                  <DataTable
                    data={aspergillusForm}
                    tableName="Survival time with disinfection"
                    firstArgument="Value"
                    secondArgument="Measure"
                  />
                  {aspergillus?.length > 0 && <Divider />}
                </div>
              )}
              <div className={`${styles.column} ${styles.flex_center}`}>
                {returnImages("Coil Intensities 3D")}
              </div>
            </div>
            <div className={styles.row}>
              <div className={`${styles.column} ${styles.flex_center}`}>
                {returnImages("Coil Intensities Distribution")}
              </div>
              <div className={`${styles.column} ${styles.flex_center}`}>
                {returnImages("Inactivation Time Distribution")}
              </div>
            </div>
          </div>
        </>
      ) : (
        <BiowallImages
          tableStateValues={tableStateValues}
          tableValues={tableValues}
          images={images}
        />
      )}
    </div>
  );
};
export default Images;
