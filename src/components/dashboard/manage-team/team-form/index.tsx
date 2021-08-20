import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import "firebase/auth";

import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  Slide,
} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import EditIcon from "@material-ui/icons/Edit";
import ImageSearchIcon from "@material-ui/icons/ImageSearch";
import SaveIcon from "@material-ui/icons/Save";

import { IApplicationState } from "../../../../store/root-reducer";
import LightTextfield from "../../../shared/textfield-light";
import { ITeamMember } from "../../../../store/team/types";
import { THEME_RED } from "../../../../Utils/patterns";
import moment from "moment";
import {
  createTeammateRequest,
  setShowFailToast,
  updateTeammateRequest,
} from "./../../../../store/team/actions";
import { uploadImg } from "../../../../services/file-upload-service";
import { IUploadFileImgParams } from "../../../../store/file-upload/types";
import { signUp } from "../../../../services/firebase-service";
import { deleteImgRequest } from "../../../../store/file-upload/actions";

import "react-toastify/dist/ReactToastify.min.css";
import "./style.css";

interface IProps {
  teammateEdited?: ITeamMember;
  setTeammateEdited: (teammateEdited: ITeamMember) => void;
}

const TeamForm = (props: IProps) => {
  const teamState = useSelector((state: IApplicationState) => state.team);
  const userState = useSelector((state: IApplicationState) => state.user);
  const fileUploadState = useSelector((state: IApplicationState) => state.file);
  const [openEmailModal, setOpenEmailModal] = useState<boolean>(false);
  const dispatch = useDispatch();

  const [teammateEdited, setTeammateEdited] = useState<ITeamMember>();
  const [chipData, setChipData] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] =
    useState<{ file: any; url: string }>();
  const [newUser, setNewUser] = useState<ITeamMember>();
  const [giveNewUserAdminPermission, setGiveNewUserAdminPermission] =
    useState<boolean>(false);

  const { register, handleSubmit, reset, setValue, getValues } = useForm();
  const hiddenFileInput = React.useRef(null);

  useEffect(() => {
    if (!teamState.teamMembers || teamState.teamMembers.length === 0) {
      getDataFromAPI();
    }
    setValue("memberSince", new Date());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!!props.teammateEdited) {
      setTeammateEdited(props.teammateEdited);
    }
  }, [props.teammateEdited, props.setTeammateEdited]);

  useEffect(() => {
    if (!!teammateEdited) {
      setValue("firstName", teammateEdited.firstName);
      setValue("lastName", teammateEdited.lastName);
      setValue("mainRole", teammateEdited.mainRole);
      setChipData(teammateEdited.secondaryRoles);
      setValue(
        "memberSince",
        moment(new Date(teammateEdited.memberSince)).format("YYYY-MM-DD")
      );
      setSelectedFile(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teammateEdited]);

  useEffect(() => {
    if (!!newUser) {
      setChipData(newUser.secondaryRoles);
    }
  }, [newUser]);

  useEffect(() => {
    if (
      !!fileUploadState.lastUploadedImg &&
      fileUploadState.lastUploadedImg.length > 0 &&
      !!fileUploadState.error
    ) {
      dispatch(deleteImgRequest({ url: fileUploadState.lastUploadedImg }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileUploadState.lastUploadedImg, fileUploadState.error]);

  const getDataFromAPI = () => {};

  const uploadUserPicture = async () => {
    const imgToUpload: IUploadFileImgParams = {
      img: selectedFile?.file,
      userSenderName: userState.user.displayName || "",
    };
    return await uploadImg(imgToUpload);
  };

  const signUpWithFirebase = async (
    email: string,
    password: string
  ): Promise<firebase.default.auth.UserCredential> => {
    return await signUp(email, password)
      .then((credential: firebase.default.auth.UserCredential) => {
        console.log("success signing up on firebase. Credential: ", credential);
        return credential;
      })
      .catch((e) => {
        console.log("error signing up on firebase: ", e);
        return e;
      });
  };

  const onSubmit = async (data: any) => {
    const firstName = data.firstName;
    const lastName = data.lastName;
    const mainRole = data.mainRole;
    const memberSince = data.memberSince;

    let teammateToSave: ITeamMember | undefined = undefined;

    if (teammateEdited) {
      //EDIT
      if (!selectedFile) {
        // HASNT UPLOADED PICTURE
        teammateToSave = {
          _id: teammateEdited._id,
          firstName: firstName,
          lastName: lastName,
          email: teammateEdited.email,
          mainRole: mainRole,
          memberSince: new Date(memberSince),
          secondaryRoles: chipData || teammateEdited.secondaryRoles,
          picture: teammateEdited.picture,
        };
        dispatch(updateTeammateRequest(teammateToSave));
      } else {
        // HAS UPLOADED PICTURE
        uploadUserPicture().then((res: any) => {
          console.log("pic url (edit): ", res.data.url);
          teammateToSave = {
            firstName: firstName,
            lastName: lastName,
            email: "",
            mainRole: mainRole,
            memberSince: new Date(memberSince),
            secondaryRoles: chipData || [],
            picture: res.data.url,
          };
          dispatch(deleteImgRequest({ url: teammateEdited.picture }));
          dispatch(updateTeammateRequest(teammateToSave));
        });
      }

      resetForm();

      //TODO: criar user no firebase
    } else {
      //CREATE
      const openModalAndSetNewUser = (pictureUrl?: string) => {
        teammateToSave = {
          firstName: firstName,
          lastName: lastName,
          email: "",
          mainRole: mainRole,
          memberSince: new Date(memberSince),
          secondaryRoles: chipData || [],
          picture: pictureUrl || "",
        };
        setOpenEmailModal(true);
        setNewUser(teammateToSave);
      };

      if (!!selectedFile) {
        // HAS UPLOADED PICTURE
        uploadUserPicture()
          .then((res: any) => {
            console.log("pic url (create): ", res.data.url);
            openModalAndSetNewUser(res.data.url);
          })
          .catch((e) => {
            dispatch(
              setShowFailToast(
                "A problem occured while uploading the picture. Contact the webmaster!"
              )
            );
          });
      } else {
        // HASNT UPLOADED PICTURE
        openModalAndSetNewUser();
      }
    }
  };

  const handleOnDeleteRoleChip = (roleToDelete: string) => {
    setChipData((chips) => chips?.filter((chip) => chip !== roleToDelete));
  };

  const handleClickPictureUpload = () => {
    const fileInputCurrent: any = hiddenFileInput?.current;
    if (hiddenFileInput !== null && fileInputCurrent !== null)
      fileInputCurrent.click();
  };

  const resetForm = () => {
    setChipData([]);
    setSelectedFile(undefined);
    setTeammateEdited(undefined);
    setGiveNewUserAdminPermission(false);
    setOpenEmailModal(false);
    setNewUser(undefined);
    reset();
  };

  const handleSubmitEmailModal = async () => {
    const email: string = getValues("email") as string;

    if (email.length < 5 || !email.includes("@") || !email.includes(".")) {
      setShowFailToast("Invalid email!");
      return;
    }

    if (!newUser) return;

    const newTeammate: ITeamMember = {
      ...newUser,
      email: email,
    };

    if (giveNewUserAdminPermission) {
      try {
        console.log(
          "process.env.REACT_APP_D_PASS as string: ",
          process.env.REACT_APP_D_PASS as string
        );
        console.log(
          "process.env.REACT_APP_BACKEND_URL as string: ",
          process.env.REACT_APP_BACKEND_URL as string
        );
        await signUpWithFirebase(email, process.env.REACT_APP_D_PASS as string)
          .then((_) => {
            //setShowSuccessToast("User successfully created!");
            dispatch(createTeammateRequest(newTeammate));
            console.log(
              "success on signup of newTeammate with email:  ",
              email,
              newTeammate
            );
            resetForm();
          })
          .catch((e) => {
            console.log("error on signup at firebase of ", email, ": ", e);
            dispatch(deleteImgRequest({ url: newTeammate.picture }));
            setShowFailToast("Error creating user!");
          });
      } catch (e) {
        console.log("error on signup at firebase of ", email, ": ", e);
        dispatch(deleteImgRequest({ url: newTeammate.picture }));
        setShowFailToast("Error creating user!");
      }
    } else {
      dispatch(createTeammateRequest(newTeammate));
      resetForm();
    }
  };

  const renderEmailModal = () => (
    <Slide direction="up" in={openEmailModal}>
      <Dialog
        fullWidth
        open={openEmailModal}
        onClose={() => setOpenEmailModal(false)}
        className="emailModalStyles"
        keepMounted
      >
        <DialogTitle id="customized-dialog-title">Create teammate</DialogTitle>
        <DialogContent>
          <Grid container>
            <LightTextfield label="Email" register={register("email")} />
          </Grid>
          <FormControlLabel
            style={{ marginTop: "20px" }}
            control={
              <Checkbox
                checked={giveNewUserAdminPermission}
                onChange={(event) =>
                  setGiveNewUserAdminPermission(event.target.checked)
                }
                style={{ color: THEME_RED }}
              />
            }
            label="Give credentials?"
          />
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              if (!!newUser)
                dispatch(deleteImgRequest({ url: newUser.picture }));
              resetForm();
              setOpenEmailModal(false);
            }}
            color="primary"
            style={{
              color: THEME_RED,
            }}
          >
            CANCEL
          </Button>
          <Button
            autoFocus
            onClick={() => handleSubmitEmailModal()}
            color="primary"
            style={{
              color: THEME_RED,
            }}
          >
            CREATE
          </Button>
        </DialogActions>
      </Dialog>
    </Slide>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {renderEmailModal()}
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={1} className="profilePictureFormGridItem">
          <div className="pictureDivParent">
            <input
              type="file"
              ref={hiddenFileInput}
              onChange={(event: any) =>
                setSelectedFile({
                  file: event.target.files[0],
                  url: URL.createObjectURL(event.target.files[0]),
                })
              }
              style={{ display: "none" }}
            />
            {!!teammateEdited &&
            teammateEdited.picture &&
            teammateEdited.picture.length > 0 ? (
              <>
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                {selectedFile ? (
                  <img
                    src={selectedFile.url}
                    className="profilePictureForm"
                    alt="Upload preview"
                  />
                ) : (
                  <img
                    src={teammateEdited.picture}
                    className="profilePictureForm"
                    alt="User preview"
                  />
                )}
                <div
                  onClick={handleClickPictureUpload}
                  className="pictureIconDiv"
                >
                  <EditIcon className="pictureEditIconOverlay" />
                </div>
              </>
            ) : (
              <div style={{ width: "100%", height: "100%" }}>
                {selectedFile ? (
                  <img
                    src={selectedFile.url}
                    className="profilePictureForm"
                    alt="Upload preview"
                  />
                ) : (
                  <ImageSearchIcon
                    onClick={handleClickPictureUpload}
                    className="profilePictureForm iconSearchPicture"
                    style={{ height: "100%", width: "auto" }}
                  />
                )}
              </div>
            )}
          </div>
        </Grid>
        <Grid item xs={12} md={2}>
          <LightTextfield
            required
            label="First Name"
            register={register("firstName")}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <LightTextfield
            required
            label="Last Name"
            register={register("lastName")}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <LightTextfield
            required
            label="Main Role"
            register={register("mainRole")}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <LightTextfield
            label="Add Role"
            register={register("secondaryRoles")}
            style={{ marginBottom: "4px" }}
            endAdornment={
              <IconButton
                onClick={() => {
                  if (teammateEdited) {
                    // EDIT TAEMMATE
                    if (!!chipData) {
                      const roles = chipData;
                      const fieldValue: string = getValues("secondaryRoles");
                      if (fieldValue.length <= 2) {
                        return;
                      }
                      roles.push(fieldValue);
                      setChipData(roles);
                      const updatedTeammate: ITeamMember = {
                        ...teammateEdited,
                        _id: teammateEdited._id,
                        firstName: getValues("firstName"),
                        lastName: getValues("lastName"),
                        mainRole: getValues("mainRole"),
                        secondaryRoles: chipData,
                        memberSince: new Date(getValues("memberSince")),
                      };
                      setTeammateEdited(updatedTeammate);
                      setValue("secondaryRoles", "");
                    }
                  } else {
                    //CREATE TAEMMATE
                    const roles = chipData;
                    const fieldValue: string = getValues("secondaryRoles");
                    if (fieldValue.length <= 2) {
                      return;
                    }
                    roles.push(fieldValue);
                    setChipData(roles);
                    const newTeammate: ITeamMember = {
                      ...newUser,
                      firstName: getValues("firstName"),
                      lastName: getValues("lastName"),
                      mainRole: getValues("mainRole"),
                      email: newUser?.email || "",
                      secondaryRoles: chipData,
                      memberSince: new Date(getValues("memberSince")),
                      picture: newUser?.picture || "",
                    };
                    setNewUser(newTeammate);
                    setValue("secondaryRoles", "");
                  }
                }}
              >
                <SaveIcon />
              </IconButton>
            }
          />
          {!!chipData &&
            chipData.length > 0 &&
            chipData.map((role: string) => (
              <Chip
                label={role}
                onDelete={(_) => handleOnDeleteRoleChip(role)}
                className="roleChip"
              />
            ))}
        </Grid>
        <Grid item xs={12} md={3}>
          <LightTextfield
            required
            shrinkLabel
            label="Member Since"
            register={register("memberSince")}
            type="date"
          />
          <Grid container item spacing={3} justifyContent="flex-end">
            {!!teammateEdited && (
              <Grid xs={12} sm={6} item>
                <Button
                  variant="outlined"
                  className="submitButton"
                  style={{
                    backgroundColor: THEME_RED,
                  }}
                  onClick={() => {
                    resetForm();
                  }}
                >
                  CANCEL
                </Button>
              </Grid>
            )}
            <Grid xs={12} sm={6} item>
              <Button
                variant="outlined"
                className="submitButton"
                style={{
                  backgroundColor: THEME_RED,
                }}
                type="submit"
              >
                SAVE
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default TeamForm;
