import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
  CircularProgress,
  FormControl,
  Button,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { validateLength } from "../../../helpers/validation";
import Image from "components/shared/image/images";
import {
  getUser,
  editUserDataRequests,
  deleteProfile,
} from "../../../services/profileService";
import navBarPaths from "../../../constants/navBarPaths";
import ShowErrorMessage from "../../../components/shared/error_message";
import { imagesPaths } from "helpers/ImagesPaths";
import { windowsWidth } from "helpers/windowWidth";

import styles from "../../../components/feature/profile/userEdit.module.scss";

const EditAccount = (): JSX.Element => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [editing, setEdit] = useState<boolean>(false);
  const [nameChanged, setNameChanged] = useState<boolean>(false);
  const [picChanged, setPicChanged] = useState<boolean>(false);
  const [profileImg, setProfileImg] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [nameMessage, setnameMessage] = useState<string>("");
  const [imgFile, setImgFile] = useState<FormData>();
  const [visible, setVisible] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const assignUserInfo = async (): Promise<void> => {
    try {
      const apiUserInfo = await getUser();
      if (apiUserInfo) {
        setEmail(apiUserInfo["email"]);
        setName(apiUserInfo["name"]);
        if (apiUserInfo["profile_image"]) {
          setProfileImg(apiUserInfo["profile_image"]);
        } else {
          setProfileImg("/icons/userDefaultImage.svg");
        }
        setLoading(false);
      }
    } catch (error) {
      setLoading(true);
    }
  };

  useEffect(() => {
    assignUserInfo();
  }, []);

  useEffect(() => {
    windowsWidth(setIsMobile);
  }, []);

  const handleName = (e): void => {
    setName(e.target.value);
    setNameChanged(true);
  };

  const toChangePass = (): void => {
    router.push(navBarPaths.change_pass);
  };

  const handleGoBack = (): void => {
    router.push(navBarPaths.inputPage);
  };

  const handleProfileImage = (e): void => {
    e.preventDefault();
    setPicChanged(true);
    const fileform = new FormData();
    const file = e.target.files[0];

    if (file) {
      setProfileImg(URL.createObjectURL(file));
    }

    fileform.append("file", file);
    setImgFile(fileform);
  };

  const handleEdit = (e): void => {
    e.preventDefault();
    setEdit(true);
  };

  const showDialogue = (): void => {
    setVisible(true);
  };

  const handleDelete = async (): Promise<void> => {
    const is_deleted = await deleteProfile();
    if (is_deleted === true) {
      router.push(navBarPaths.login);
    } else {
      setError(true);
      setErrorMessage(is_deleted);
    }
  };

  const handleSubmit = async (e): Promise<void> => {
    e.preventDefault();
    setnameMessage("");

    if (nameChanged) {
      if (!validateLength(4, 20, name)[0]) {
        setnameMessage(
          "name should not be lessthan 4 or greter than 8 character"
        );
      } else {
        setSubmitLoading(true);
        const response = await editUserDataRequests("", name);
        if (response === true) {
          setSubmitLoading(false);
          setError(true);
          setEdit(false);
          setErrorMessage("Information updated");
        } else {
          setSubmitLoading(false);
          setError(true);
          setEdit(false);
          setErrorMessage(response);
        }
      }
    } else if (picChanged) {
      setSubmitLoading(true);
      const response = await editUserDataRequests(imgFile);
      if (response === true) {
        setSubmitLoading(false);
        setError(true);
        setEdit(false);
        setErrorMessage("Information updated");
      } else {
        setSubmitLoading(false);
        setError(true);
        setEdit(false);
        setErrorMessage(response);
      }
    } else if (nameChanged && picChanged) {
      setSubmitLoading(true);
      const response = await editUserDataRequests(imgFile, name);

      if (response === true) {
        setSubmitLoading(false);
        setError(true);
        setEdit(false);
        setErrorMessage("Information updated");
      } else {
        setSubmitLoading(false);
        setError(true);
        setEdit(false);
        setErrorMessage(response);
      }
    } else {
      setSubmitLoading(false);
      setEdit(false);
    }
  };

  return (
    <div className={styles.edit_container}>
      {isMobile &&
        <div className={styles.backButton} onClick={handleGoBack}>
          <Image
            width={40}
            height={40}
            src={imagesPaths.backArrow}
            className={styles.backIcon}
            alt="back"
          />
          <p>Back</p>
        </div>
      }
      <Dialog
        open={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="confirm-dialog"
      >
        <DialogTitle id="confirm-dialog">Delete account</DialogTitle>
        <DialogContent>
          Are you sure you want to delete your account, this action can not be
          reversed
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setVisible(false)}
            variant="contained"
            className={styles.deleteAccNo}
          >
            No
          </Button>
          <Button
            onClick={() => {
              setVisible(false);
              handleDelete();
            }}
            className={styles.deleteAccYes}
            variant="contained"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <FormControl className={styles.edit_account}>
        {!isMobile &&
          <div className={styles.backButtonProfile} onClick={handleGoBack}>
            <Image
              width={40}
              height={40}
              src={imagesPaths.backArrow}
              className={styles.backIcon}
              alt="back"
            />
            <p>Back</p>
          </div>
        }
        <h1 className={styles.title}>Profile</h1>
        {ShowErrorMessage({ error, errorMessage })}
        <div className={styles.field}>
          <div className={styles.profile_img}>
            <div className={styles.profileContainer}>
              <div>
                <Image
                  width={!profileImg ? 60 : 150}
                  height={profileImg ? 90 : 150}
                  src={profileImg}
                  alt=""
                />
              </div>
            </div>
          </div>
          <TextField
            className={styles.inputs}
            InputLabelProps={{
              className: styles.inputLabel,
            }}
            FormHelperTextProps={{
              className: styles.errorMessage,
            }}
            focused={editing}
            disabled={!editing}
            required
            label="Name"
            helperText={nameMessage}
            onChange={handleName}
            value={name}
          />
          <div className={styles.loading}>
            {loading ? <LinearProgress /> : <></>}
          </div>
        </div>

        <div className={styles.field}>
          <TextField
            className={styles.inputs}
            InputLabelProps={{
              className: styles.inputLabel,
            }}
            FormHelperTextProps={{
              className: styles.errorMessage,
            }}
            required
            disabled
            label="Email"
            value={email}
          />
          <div className={styles.loading}>
            {loading ? <LinearProgress /> : <></>}
          </div>
        </div>

        {submitLoading && <CircularProgress />}

        <div className={styles.buttonsContainer}>
          <Button
            onClick={editing ? handleSubmit : handleEdit}
            className={styles.save}
          >
            {editing ? "Save Changes" : "Edit"}
          </Button>
          <p onClick={toChangePass} className={styles.changePassword}>
            Change Password
          </p>
        </div>

        <h2 className={styles.horizontal}>
          <span>OR</span>
        </h2>
        <div className={styles.delete}>
          <p className={styles.link}>
            <a onClick={showDialogue}>Terminate account</a>
          </p>
        </div>
      </FormControl>
    </div>
  );
};
export default EditAccount;
