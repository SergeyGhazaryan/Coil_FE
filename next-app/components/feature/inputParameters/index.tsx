import React, { createContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { CircularProgress, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import ResponsiveDialog from "components/shared/warningModal";
import { MicroOrganisms } from "components/shared/selectMicroorganism/types";
import { PageStepper } from "components/shared/page_stepper";
import { FooterButtons } from "components/shared/footer_buttons";
import { getBiowallImages, getImages } from "services/inputDataService";
import { getHistoryData } from "services/historyDataServise";
import { SidebarInfo } from "components/shared/sidebar_info";
import DescriptionAlerts from "components/shared/errorHandler/errorMessage";
import FirstPage from "../firstPage";
import { SecondStep } from "../secondStep";
import { ThirdStep } from "../thirdStep";
import { TableStateValues } from "./types";
import { imagesPaths } from "helpers/ImagesPaths";
import { warningModalContext } from "helpers/contexts";
import { ReportTypes } from "helpers/defaultInputValues";
import Image from "components/shared/image/images";
import { windowsWidth } from "helpers/windowWidth";

import styles from "./inputParameters.module.scss";

const drawerWidth = 300;
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const typeObject = {
  coilclean: "CoilReports",
  biowall: "BiowallReports",
};

const Input = (): JSX.Element => {
  const [open, setOpen] = useState<boolean>(true);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [lampLoading, setLampLoading] = useState<boolean>(false);
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [reportType, setReportType] = useState<ReportTypes>(
    ReportTypes.COILCLEAN
  );
  const matches = useMediaQuery("(min-width:376px)");

  const [reportName, setReportName] = useState<string>("");
  const [warningModal, setWarningModal] = useState<Boolean>(false);
  const [pagesControl, setPageControl] = useState<Boolean>(false);
  const [optimizationControl, setOptimizationControl] = useState<boolean>(true);
  const [biowallReportType, setBiowallReportType] = useState<boolean>(false);
  const [variableForWarningModal, setVariableForWarningModal] =
    useState<Number>(0);
  const [isEqual, setIsEqual] = useState<boolean>(true);
  const [alert, setAlert] = useState({
    data: false,
    name: false,
  });
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    windowsWidth(setIsMobile);
  }, []);

  const [tableStateValues, setTableStateValues] = useState<TableStateValues>({
    widthX: 1600,
    heightY: 1600,
    downstreamCoeff: 0.85,
    maxDistToCoil: 1000,
    requiredInactivationRate: 99,
    maxInactivationTime: 60,
    susceptibilityCoefficient: MicroOrganisms[0].sum,
    minimumUVIrrIntensity: 500,
    reflectionCoeff: 0.5,
    minDistWallX: 30,
    minDistWallY: 130,
    airFlow: 100,
    microorganismOption: "ASPERGILLUS NIGER",
    optType: "Microorganism",
    optimizeOption: 0,
  });

  useEffect(() => {
    if ((reportName.length && page === 1) || (biowallReportType && page === 2))
      setDisabled(false);
    // else setDisabled(true);
  }, [reportName, page, warningModal]);

  const handleCalculate = async (): Promise<void> => {
    setAlert({
      ...alert,
      data: false,
    });
    setLoading(true);
    setLampLoading(true);
    const data =
      reportType === ReportTypes.COILCLEAN
        ? [
            tableStateValues.widthX,
            tableStateValues.heightY,
            tableStateValues.downstreamCoeff,
            tableStateValues.maxDistToCoil,
            tableStateValues.requiredInactivationRate,
            tableStateValues.maxInactivationTime,
            tableStateValues.susceptibilityCoefficient,
            tableStateValues.minimumUVIrrIntensity,
            tableStateValues.reflectionCoeff,
            tableStateValues.minDistWallX,
            tableStateValues.minDistWallY,
            tableStateValues.microorganismOption,
            tableStateValues.optType,
            tableStateValues.optimizeOption,
            reportName,
          ]
        : [
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
          ];

    const imgs =
      reportType === ReportTypes.COILCLEAN
        ? await getImages(data)
        : await getBiowallImages(data);

    if (
      imgs != "No valid data for calculations" &&
      imgs !=
        "The form submitted is invalid,\n             please check values in 'input Parameters' page and press calculation button, after you can see results"
    ) {
      setPage(3);
      setImages(imgs);
      setLampLoading(false);
      setWarningModal(false);
    } else {
      setAlert({
        ...alert,
        data: true,
      });
      setTimeout(
        () =>
          setAlert({
            ...alert,
            data: false,
          }),
        3000
      );
      setTimeout(
        () =>
          setAlert({
            ...alert,
            data: false,
          }),
        3000
      );
    }
    setLoading(false);
  };

  const assignImages = async () => {
    try {
      const api_images = images;
      if (api_images["images"]) {
        setLampLoading(false);
        setLoading(false);
      } else {
        setLoading(false);
        setLampLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setLampLoading(false);
    }
  };

  const handleNextPage = async () => {
    const historyArr = await getHistoryData(reportType);
    const filteredArr = await historyArr[typeObject[reportType]].filter(
      (elem) => elem.report_name.toLowerCase() == reportName.toLowerCase()
    );

    if (filteredArr.length == 0) {
      setPage(page + 1);
      setDisabled(true);
    } else {
      setAlert({
        ...alert,
        name: true,
      });
      setTimeout(
        () =>
          setAlert({
            ...alert,
            name: false,
          }),
        3000
      );
    }
  };

  const handleDrawerOpen = (): void => {
    setMobileOpen(!mobileOpen);
  };

  const handlePreviousPage = () => {
    if (optimizationControl && isEqual) {
      setPage(1);
    } else {
      setVariableForWarningModal(7);
      setWarningModal(true);
      setIsEqual(false);
    }
  };

  useEffect(() => {
    assignImages();
  }, []);

  return (
    <warningModalContext.Provider
      value={{
        setPageControl,
        warningModal,
        setWarningModal,
        variableForWarningModal,
        setVariableForWarningModal,
        isEqual,
        setIsEqual,
        setDisabled,
        setOptimizationControl,
        optimizationControl,
        setBiowallReportType,
        biowallReportType,
      }}
    >
      {warningModal && !isEqual && (
        <ResponsiveDialog setPage={setPage} page={page} />
      )}
      <SidebarInfo
        reportType={reportType}
        reportName={reportName}
        tableStateValues={tableStateValues}
        setPage={setPage}
        page={page}
        mobileOpen={mobileOpen}
        setReportType={setReportName}
        setOpen={setOpen}
        open={open}
      />
      <div className={isMobile ? styles.content : styles.contentMobile}>
        <Box sx={{ display: "flex" }}>
          <div className={isMobile ? styles.mainContainer : styles.mainContainerMobile}>
              <PageStepper page={page} />
              {loading && <div className={styles.loading}>
                <CircularProgress />
              </div>}
              <FirstPage
                setReportType={(value) => setReportType(value)}
                setReportName={(value) => setReportName(value)}
                page={page}
                reportType={reportType}
                reportName={reportName}
              />
              <SecondStep
                reportType={reportType}
                setTableStateValues={setTableStateValues}
                page={page}
                loading={loading}
                setDisabled={setDisabled}
              />
              <ThirdStep
                loading={loading}
                lampLoading={lampLoading}
                tableStateValues={tableStateValues}
                report_type={reportType}
                reportName={reportName}
                images={images}
                page={page}
              />
              {!loading &&
                <FooterButtons
                  page={page}
                  handleCalculate={handleCalculate}
                  handlePreviousPage={handlePreviousPage}
                  handleNextPage={handleNextPage}
                  disabled={disabled}
                />
              }
          </div>
        </Box>
      </div>
      {(alert.data || alert.name) && (
        <>
          {alert.data ? (
            <DescriptionAlerts text={"No valid data for calculation"} />
          ) : (
            <DescriptionAlerts
              text={"Report with the same name already exists"}
            />
          )}
        </>
      )}
    </warningModalContext.Provider>
  );
};

export default Input;
