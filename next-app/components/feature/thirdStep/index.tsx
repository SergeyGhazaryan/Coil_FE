import { CircularProgress } from "@mui/material";
import { MicroOrganisms } from "components/shared/selectMicroorganism/types";
import ReportTabs from "components/shared/tabs";
import { useState } from "react";
import Image from "next/image";
import BioLampInstallation from "../bioLampInstallation";
import Images from "../images";
import LampInstallation from "../lamp_installation";
import { IThirdStepProps } from "./types";
import { createOptimizeResultPDF } from "services/pdfService";
import downloadPDFICon from "../../../public/icons/downloadPDF.svg";
import { ReportTypes } from "helpers/defaultInputValues";


import styles from "./thirdStep.module.scss";

export const ThirdStep: React.FC<IThirdStepProps> = ({
  report_type,
  tableStateValues,
  reportName,
  images,
  lampLoading,
  loading,
  page,
}) => {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handelUploadPDF = () => {
    createOptimizeResultPDF({
      ...images,
      tableStateValues,
      report_type,
    });
  };

  return (
    <>
      {page == 3 && !loading && (
        <>
          <div className={styles.headerContainer}>
            <ReportTabs
              handleChange={handleChange}
              tabValue={tabValue}
              labels={["Results", "Installation"]}
            />
            <button
              onClick={handelUploadPDF}
              className={styles.loadingPDFButton}
              disabled={report_type !== ReportTypes.COILCLEAN} // Will be removed after biowall pdf logic implementation
            >
              <Image
                src={downloadPDFICon}
                width={16}
                height={16}
                alt="Download PDF"
              />
              <span>Download PDF</span>
            </button>
          </div>
          {loading ? (
            <div className={styles.loading}>
              <CircularProgress />
            </div>
          ) : (
            <>
              {tabValue === 0 && (
                <Images
                  images={images}
                  reportType={report_type}
                  tableStateValues={tableStateValues}
                  tableValues={[
                    tableStateValues.widthX,
                    tableStateValues.heightY,
                    tableStateValues.lengthZ,
                    tableStateValues.reflectionCoeff,
                    tableStateValues.airFlow,
                    tableStateValues.optimizeOption,
                    MicroOrganisms.filter(
                      (organism) =>
                        Array.isArray(tableStateValues.microorganismOption) &&
                        tableStateValues.microorganismOption.some(
                          (name) => name === organism.name
                        )
                    ),
                    tableStateValues.inactPasses,
                    reportName,
                    tableStateValues.layersData,
                  ]}
                  isLoading={loading}
                  requiredInactivationRate={
                    tableStateValues.requiredInactivationRate
                  }
                />
              )}
              {tabValue === 1 && (
                <>
                  {report_type == ReportTypes.COILCLEAN ? (
                    <LampInstallation images={images} isLoading={lampLoading} />
                  ) : (
                    <BioLampInstallation
                      tableValues={[
                        tableStateValues.widthX,
                        tableStateValues.heightY,
                        tableStateValues.lengthZ,
                        tableStateValues.reflectionCoeff,
                        tableStateValues.airFlow,
                        tableStateValues.optimizeOption,
                        MicroOrganisms.filter(
                          (organism) =>
                            Array.isArray(
                              tableStateValues.microorganismOption
                            ) &&
                            tableStateValues.microorganismOption.some(
                              (name) => name === organism.name
                            )
                        ),
                        tableStateValues.inactPasses,
                        reportName,
                        tableStateValues.layersData,
                      ]}
                      images={images}
                      isLoading={lampLoading}
                    />
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};
