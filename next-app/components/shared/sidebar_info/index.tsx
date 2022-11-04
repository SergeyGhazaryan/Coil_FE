import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import MiniSidebar from "components/feature/miniSidebar";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Sidebar from "components/feature/sidebar";
import { ISideBarProps } from "./types";
import Image from "components/shared/image/images";
import { imagesPaths } from "helpers/ImagesPaths";

import styles from "./sidebarInfo.module.scss";

const drawerWidth = 300;

export const SidebarInfo: React.FC<ISideBarProps> = ({
  page,
  setPage,
  reportType,
  tableStateValues,
  setReportType,
  reportName,
  setOpen,
  open,
}) => {
  const [windowScreen, setWindowScreen] = useState<number | undefined>();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const handleDrawerClose = (): void => {
    setOpen(false);
  };

  useEffect(() => {
    const windowSize = window?.innerWidth;
    setWindowScreen(windowSize);
    const closeHamburgerMenu = () => {
      setIsMobile(windowSize > 1024);
    };
    closeHamburgerMenu();
    window.addEventListener("resize", closeHamburgerMenu);
    return () => window.removeEventListener("resize", closeHamburgerMenu);
  }, []);

  return (
    <>
      {windowScreen > 1024 ? (
        <MiniSidebar
          page={page}
          setPage={setPage}
          setOpen={setOpen}
          tableStateValues={tableStateValues}
          reportType={reportType}
          setReportType={setReportType}
          reportName={reportName}
        />
      ) : (
        <div className={styles.burgerMenu}>
          <Image
            src={imagesPaths.hamburger}
            alt="hamburger"
            width={20}
            height={20}
            className={styles.hamburger}
            onClick={() => setOpen(true)}
          />
        </div>
      )}
      <div className={styles.openBarMenu}>
        <Sidebar
          isMobile={isMobile}
          setOpen={setOpen}
          open={open}
          page={page}
          setPage={setPage}
          drawerWidth={drawerWidth}
          reportType={reportType}
          tableStateValues={tableStateValues}
          setReportType={setReportType}
          reportName={reportName}
        />
        {open && isMobile && (
          <div className={styles.iconOpen}>
            <IconButton
              color="inherit"
              aria-label="close drawer"
              onClick={handleDrawerClose}
            >
              <ChevronLeftIcon className={styles.menu_buttons} />
            </IconButton>
          </div>
        )}
      </div>
    </>
  );
};
