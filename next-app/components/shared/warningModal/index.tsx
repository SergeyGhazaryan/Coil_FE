import { useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import {
  coilEditWarningModalContext,
  editWarningModalContext,
  warningModalContext,
} from "helpers/contexts";
import { useRouter } from "next/router";
import navBarPaths from "constants/navBarPaths";
import { ResponsiveDialogTypes } from "./types";
import { defaultWarningModalText } from "constants/defaultWarningText";
import { getHistoryDataRemove } from "services/historyDataServise";

export default function ResponsiveDialog({
  setPage,
  page,
  text = defaultWarningModalText.defaultWarningMessage,
  closeButtonText = defaultWarningModalText.defaultCloseButtonText,
  agreeButtonText = defaultWarningModalText.defaultAgreeButtonText,
  removeModalType = false,
  reportTypes,
  reportId,
  BERequestBody,
  getHistory,
  setWarningModal,
  editModalType = false,
  coilEditModalType = false,
}: ResponsiveDialogTypes) {
  const theme = useTheme();
  const modalContext = useContext(warningModalContext);
  const editModalContext = useContext(editWarningModalContext);
  const coilEditModalContext = useContext(coilEditWarningModalContext);
  const router = useRouter();

  const handleClose = (): void => {
    if (!removeModalType && !editModalType && !coilEditModalType) {
      modalContext?.setWarningModal(false);
      if (page === 2) modalContext?.setDisabled(false);
    } else if (editModalType && !coilEditModalType) {
      editModalContext.setEditWarningModal(false);
    } else if (coilEditModalType && !editModalType) {
      coilEditModalContext.setCoilEditWarningModal(false);
    } else {
      setWarningModal(false);
    }
  };

  const handleCloseAgree = async (): Promise<void> => {
    if (!removeModalType && !editModalType && !coilEditModalType) {
      if (
        modalContext?.variableForWarningModal === 4 ||
        modalContext?.variableForWarningModal === 1
      ) {
        modalContext?.setWarningModal(false);
        modalContext?.setPageControl(true);
        router.push(navBarPaths.history);
      } else if (modalContext?.variableForWarningModal === 2) {
        modalContext?.setWarningModal(false);
        modalContext?.setPageControl(true);
        setPage(1);
      } else if (
        modalContext?.variableForWarningModal === 5 ||
        modalContext?.variableForWarningModal === 6
      ) {
        modalContext?.setWarningModal(false);
        modalContext?.setPageControl(true);
        router.push(navBarPaths.profile);
      } else if (modalContext?.variableForWarningModal === 7) {
        modalContext?.setWarningModal(false);
        modalContext?.setPageControl(true);
        setPage(1);
      }
      modalContext?.setDisabled(true);
    } else if (editModalType && !coilEditModalType) {
      router.push(editModalContext.reference);
      editModalContext.setEditWarningModal(false);
    } else if (coilEditModalType && !editModalType) {
      router.push(coilEditModalContext.reference);
      coilEditModalContext.setCoilEditWarningModal(false);
    } else {
      await getHistoryDataRemove(reportId, BERequestBody);
      await getHistory(reportTypes);
      setWarningModal(false);
    }
  };

  return (
    <Dialog
      open={
        removeModalType
          ? true
          : modalContext?.warningModal
          ? true
          : editModalType || coilEditModalType
      }
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{"Warning!!"}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCloseAgree}>
          {agreeButtonText}
        </Button>
        <Button onClick={handleClose} autoFocus>
          {closeButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
