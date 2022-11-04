import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { imagesPaths } from "helpers/ImagesPaths";
import Image from "next/image";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { CircularProgress, IconButton } from "@mui/material";
import { logout } from "services/authService";
import navBarPaths from "constants/navBarPaths";
import { MiniSidebarProps } from "./types";
import {
  coilEditWarningModalContext,
  editWarningModalContext,
  warningModalContext,
} from "helpers/contexts";

import styles from "../../feature/miniSidebar/miniSidebar.module.scss";

const MiniSidebar = ({
  page,
  setPage,
  setOpen,
  reportName,
  reportType,
}: MiniSidebarProps) => {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState<boolean>(false);
  const [downloading, setDownloading] = useState<boolean>(false);
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

  const handleDrawerOpen = (): void => {
    setOpen(true);
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

  const handleLogout = async (): Promise<void> => {
    modalContext?.setDisabled(true);
    setLoggingOut(true);
    const isLoggedOut = await logout();
    if (isLoggedOut) {
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
    return `${styles.line} ${page === 1 || page === 2 || (page === 3 && styles.activeLine)
      }`;
  };

  const viewHistoryPage = (): string => {
    return `${styles.line} ${isHistoryPage && styles.activeLine}`;
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.closedBar}>
        <div className={styles.headerIconClosed}>
          <Image
            src={imagesPaths.hamburger}
            alt="hamburger"
            width="20px"
            height="20px"
          />
        </div>
        <div className={styles.iconLinks}>
          <div className={styles.iconsBox} onClick={handleCreateReportPage}>
            <div className={selectCLassName()} />
            {returnMenuIcons(1, "reportActive", "report")}{" "}
          </div>

          <div className={styles.iconsBox} onClick={handleReportHistoryPage}>
            <div className={viewHistoryPage()} />
            {returnMenuIcons(4, "viewReportActive", "viewReport")}
          </div>
          <div className={styles.iconsBox}>
            <div className={styles.line} onClick={toProfile} />
            <Image
              src={imagesPaths.profile}
              alt="profile"
              onClick={toProfile}
              width="20px"
              height="20px"
            />
          </div>
          <div className={styles.iconsBox} onClick={handleLogout}>
            <div className={styles.line} />
            <div className={styles.iconContainer}>
              <span>
                <Image
                  src={imagesPaths.logout}
                  alt="logout"
                  onClick={handleLogout}
                  width="20px"
                  height="20px"
                />
                {loggingOut && <CircularProgress size={15} />}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.icon}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
        >
          <ChevronRightIcon className={styles.menu_buttons} />
        </IconButton>
      </div>
    </div>
  );
};

export default MiniSidebar;
