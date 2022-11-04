import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { CircularProgress, FormControl, useMediaQuery } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import navBarPaths from "constants/navBarPaths";
import { logout } from "services/authService";
import { imagesPaths } from "helpers/ImagesPaths";
import Image from "next/image";
import { SidebarProps } from "./types";
import {
  coilEditWarningModalContext,
  editWarningModalContext,
  warningModalContext,
} from "helpers/contexts";

import styles from "../../feature/sidebar/sidebar.module.scss";

const Sidebar = ({
  open,
  setPage,
  page,
  drawerWidth,
  mobileOpen,
  reportName,
  isMobile,
  setOpen
}: SidebarProps) => {
  const router = useRouter();
  const matches = useMediaQuery("(min-width:320px)");
  const [loggingOut, setLoggingOut] = useState<boolean>(false);

  const isHistoryPage = useRouter().pathname === "/reports_history";

  const modalContext = useContext(warningModalContext);
  const editModalContext = useContext(editWarningModalContext);
  const coilEditModalContext = useContext(coilEditWarningModalContext);
  const routerQueryLength = !Object.values(router.query).length;

  const editPageModal = (url: string) => {
    if (!editModalContext?.equal && !routerQueryLength) {
      if (editModalContext?.setReference) {
        editModalContext?.setReference(url);
        editModalContext?.setEditWarningModal(true);
      } else if (!coilEditModalContext?.coilEditEqual) {
        coilEditModalContext?.setReference(url);
        coilEditModalContext?.setCoilEditWarningModal(true);
      } else {
        router.push(url);
      }
    } else {
      router.push(url);
    }
  };

  const toProfile = (): void => {
    if (!page && !setPage) {
      editPageModal(navBarPaths.profile);
      return;
    }
    if (page !== 1 && !modalContext?.biowallReportType)
      modalContext?.setDisabled(true);
    if (
      modalContext?.isEqual &&
      page !== 1 &&
      modalContext?.optimizationControl
    ) {
      modalContext?.setWarningModal(false);
      router.push(navBarPaths.profile);
    } else if (page === 2 && !modalContext?.optimizationControl) {
      modalContext?.setVariableForWarningModal(5);
      modalContext?.setIsEqual(false);
      modalContext?.setWarningModal(true);
    } else if (page === 1 && reportName !== "") {
      modalContext?.setVariableForWarningModal(6);
      modalContext?.setIsEqual(false);
      modalContext?.setWarningModal(true);
    } else if (modalContext?.optimizationControl && page === 2) {
      modalContext?.setVariableForWarningModal(5);
      modalContext?.setWarningModal(true);
    } else {
      router.push(navBarPaths.profile);
    }
  };

  const handleLogout = async (): Promise<void> => {
    modalContext?.setDisabled(true);
    setLoggingOut(true);
    const is_logged_out = await logout();
    if (is_logged_out) {
      router.push(navBarPaths.login);
      setLoggingOut(false);
    }
  };

  const handleCreateReportPage = (): void => {
    if (!page && !setPage) {
      editPageModal("/");
      return;
    }
    if (page !== 1 && !modalContext?.biowallReportType)
      modalContext?.setDisabled(true);
    if (
      modalContext?.isEqual &&
      routerQueryLength &&
      modalContext.optimizationControl
    ) {
      modalContext.setWarningModal(false);
      router.push("/");
      if (setPage) setPage(1);
    } else {
      if (page === 2) {
        if (!modalContext.optimizationControl) {
          modalContext.setIsEqual(false);
        }
        modalContext.setVariableForWarningModal(2);
        modalContext.setWarningModal(true);
      } else if (routerQueryLength) {
        router.push("/");
        if (setPage) setPage(1);
      }
    }
  };

  const handleReportHistoryPage = (): void => {
    if (!page && !setPage) {
      editPageModal(navBarPaths.history);
      return;
    }
    if (page !== 1 && !modalContext?.biowallReportType)
      modalContext?.setDisabled(true);
    if (
      modalContext?.isEqual &&
      routerQueryLength &&
      page !== 1 &&
      modalContext.optimizationControl
    ) {
      modalContext.setWarningModal(false);
      router.push(navBarPaths.history);
    } else {
      if (routerQueryLength && page === 2) {
        modalContext.setIsEqual(false);
        modalContext.setVariableForWarningModal(4);
        modalContext.setWarningModal(true);
      } else if (page === 1 && reportName !== "") {
        modalContext.setVariableForWarningModal(1);
        modalContext?.setIsEqual(false);
        modalContext.setWarningModal(true);
      } else {
        router.push(navBarPaths.history);
      }
    }
  };

  const selectCLassName = (): string => {
    return `${styles.separateLink} ${page === 1 || page === 2 || (page === 3 && styles.activeLink)
      }`;
  };

  const createReportCLassName = (): string => {
    return page !== 1 && page !== 2 && page !== 3
      ? styles.tabMenuTitle
      : styles.tabMenuActive;
  };

  const viewReportsClassName = (): string => {
    return `${styles.separateLink} ${isHistoryPage && styles.activeLink}`;
  };

  const viewReportsDivClassName = (): string => {
    return `${styles.line} ${isHistoryPage && styles.activeLine}`;
  };

  const viewReportsTextCLassName = (): string => {
    return !isHistoryPage ? styles.tabMenuTitle : styles.tabMenuActive;
  };

  const createReportsDivClassName = (): string => {
    return `${styles.line} ${!isHistoryPage && styles.activeLine}`;
  };

  const returnMenuIcons = (
    iconPage: number,
    activeIconName: string,
    inactiveIconName: string
  ): JSX.Element => {
    return (
      <Image
        src={`/icons/${page === iconPage ? activeIconName : inactiveIconName
          }.svg`}
        alt="menu-icon"
        width={20}
        height={20}
      />
    );
  };

  return (
    <Drawer
      PaperProps={{
        sx: {
          flexShrink: 0,
          background: "#048A81",
          width: matches ? drawerWidth : mobileOpen ? "100%" : "0",
          marginTop: matches ? 0 : "50px",
          boxSizing: "border-box",
          minWidth: !isMobile && '100%',
        },
      }}
      className={styles.drawer}
      open={matches ? open : mobileOpen}
      variant="persistent"
      anchor="left"
    >
      <div className={styles.openBarFixed}>
        <FormControl
          sx={{
            width: matches ? "200px" : "70%",
            textAlign: "left",
          }}
        >
          <div className={styles.headerIcon}>
            <Image
              src={imagesPaths.hamburger}
              alt="hamburger"
              width="20px"
              height="20px"
              onClick={() => { setOpen(false) }}
            />
          </div>
          <div className={styles.iconLinks}>
            <div className={selectCLassName()} onClick={handleCreateReportPage}>
              <div className={createReportsDivClassName()}></div>
              {returnMenuIcons(1, "reportActive", "report")}{" "}
              <p className={createReportCLassName()}>Create Report</p>
            </div>
            <div
              className={viewReportsClassName()}
              onClick={handleReportHistoryPage}
            >
              <div className={viewReportsDivClassName()}></div>
              {returnMenuIcons(4, "viewReportActive", "viewReport")}
              <p className={viewReportsTextCLassName()}>View report</p>
            </div>

            <div className={styles.separateLink} onClick={toProfile}>
              <div className={`${styles.line}`}></div>
              <Image
                src={imagesPaths.profile}
                alt="profile"
                width={20}
                height={20}
                onClick={toProfile}
              />{" "}
              <p className={styles.tabMenuTitle}>Profile</p>
            </div>
            <div className={styles.logOutIcon}>
              <div className={styles.separateLink} onClick={handleLogout}>
                <div className={styles.line} />
                <Image
                  src={imagesPaths.logout}
                  alt="logout"
                  onClick={handleLogout}
                  width="20px"
                  height="20px"
                />
                <p className={styles.tabMenuTitle}>Logout</p>
                {loggingOut && <CircularProgress size={15} />}
              </div>
            </div>
          </div>
        </FormControl>
      </div>
    </Drawer>
  );
};

export default Sidebar;
