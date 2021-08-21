import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import "firebase/auth";

import { Button, CircularProgress, Grid, IconButton } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import ImageSearchIcon from "@material-ui/icons/ImageSearch";
import SaveIcon from "@material-ui/icons/Save";

import { IApplicationState } from "../../../../store/root-reducer";
import LightTextfield from "../../../shared/textfield-light";
import { THEME_RED } from "../../../../Utils/patterns";
import { setShowFailToast } from "./../../../../store/team/actions";
import { uploadImg } from "../../../../services/file-upload-service";
import { IUploadFileImgParams } from "../../../../store/file-upload/types";
import { signUp } from "../../../../services/firebase-service";
import { deleteImgRequest } from "../../../../store/file-upload/actions";

import "react-toastify/dist/ReactToastify.min.css";
import "./style.css";
import { IPortfolioItem } from "../../../../store/portfolio/types";
import {
  createPortfolioRequest,
  updatePortfolioRequest,
} from "../../../../store/portfolio/actions";

interface IProps {
  portfolioEdited?: IPortfolioItem;
  setPortfolioEdited: (portfolioEdited: IPortfolioItem) => void;
}

const PortfolioForm = (props: IProps) => {
  const userState = useSelector((state: IApplicationState) => state.user);
  const portfolioState = useSelector(
    (state: IApplicationState) => state.portfolio
  );
  const fileUploadState = useSelector((state: IApplicationState) => state.file);
  const dispatch = useDispatch();

  const [portfolioEdited, setPortfolioEdited] = useState<IPortfolioItem>();
  const [chipData, setChipData] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] =
    useState<{ file: any; url: string }>();
  const [newPortfolio, setNewPortfolio] = useState<IPortfolioItem>();

  const { register, handleSubmit, reset, setValue, getValues } = useForm();
  const hiddenFileInput = React.useRef(null);

  useEffect(() => {
    if (!!props.portfolioEdited) {
      setPortfolioEdited(props.portfolioEdited);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.portfolioEdited, props.portfolioEdited]);

  useEffect(() => {
    if (!!portfolioEdited) {
      setValue("name", portfolioEdited.name);
      setValue("description", portfolioEdited.description);
      setValue("storeUrl", portfolioEdited.storeUrl);
      setChipData(portfolioEdited.otherUrls || []);
      setSelectedFile(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portfolioEdited]);

  useEffect(() => {
    if (!!newPortfolio) {
      setChipData(newPortfolio.otherUrls || []);
    }
  }, [newPortfolio]);

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

  const uploadPicture = async () => {
    const imgToUpload: IUploadFileImgParams = {
      img: selectedFile?.file,
      userSenderName: userState.user.displayName || "",
    };
    return await uploadImg(imgToUpload);
  };

  const onSubmit = async (data: any) => {
    const name = data.name;
    const description = data.description;
    const storeUrl = data.storeUrl;

    let portfolioToSave: IPortfolioItem | undefined = undefined;

    if (portfolioEdited) {
      //EDIT
      if (!selectedFile) {
        // HASNT UPLOADED PICTURE
        portfolioToSave = {
          _id: portfolioEdited._id,
          name: name,
          description: description,
          highlightImg: portfolioEdited.highlightImg,
          storeUrl: storeUrl,
          otherUrls: chipData || portfolioEdited.otherUrls || [],
          imgs: portfolioEdited.imgs,
        };
        dispatch(updatePortfolioRequest(portfolioToSave));
      } else {
        // HAS UPLOADED PICTURE
        uploadPicture().then((res: any) => {
          console.log("pic url (edit): ", res.data.url);
          portfolioToSave = {
            _id: portfolioEdited._id,
            name: name,
            description: description,
            storeUrl: storeUrl,
            otherUrls: chipData || portfolioEdited.otherUrls,
            highlightImg: res.data.url,
            imgs: portfolioEdited.imgs,
          };
          dispatch(deleteImgRequest({ url: portfolioEdited.highlightImg }));
          dispatch(updatePortfolioRequest(portfolioToSave));
        });
      }

      //TODO: criar user no firebase
    } else {
      //CREATE
      if (!!selectedFile) {
        // HAS UPLOADED PICTURE
        uploadPicture()
          .then((res: any) => {
            portfolioToSave = {
              name: name,
              description: description,
              storeUrl: storeUrl,
              otherUrls: chipData || [],
              highlightImg: res.data.url,
              imgs: [],
            };
            dispatch(createPortfolioRequest(portfolioToSave));
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
        portfolioToSave = {
          name: name,
          description: description,
          storeUrl: storeUrl,
          otherUrls: chipData || [],
          highlightImg: "",
          imgs: [],
        };
        dispatch(createPortfolioRequest(portfolioToSave));
      }
    }

    resetForm();
  };

  const handleOnDeleteRoleChip = (urlToDelete: string) => {
    setChipData(chipData?.filter((chip) => chip !== urlToDelete));
  };

  const handleClickPictureUpload = () => {
    const fileInputCurrent: any = hiddenFileInput?.current;
    if (hiddenFileInput !== null && fileInputCurrent !== null)
      fileInputCurrent.click();
  };

  const resetForm = () => {
    setChipData([]);
    setSelectedFile(undefined);
    setPortfolioEdited(undefined);
    setNewPortfolio(undefined);
    reset();
  };

  const handleClickSaveOtherUrl = () => {
    if (portfolioEdited) {
      // EDIT TAEMMATE
      if (!!chipData) {
        const urls = chipData;
        const fieldValue: string = getValues("otherUrls");
        if (fieldValue.length <= 2) {
          return;
        }
        urls.push(fieldValue);
        setChipData(urls);
        const portfolio: IPortfolioItem = {
          ...portfolioEdited,
          _id: portfolioEdited._id,
          name: getValues("name"),
          description: getValues("description"),
          storeUrl: getValues("storeUrl"),
          otherUrls: chipData,
        };
        setPortfolioEdited(portfolio);
        setValue("otherUrls", "");
      }
    } else {
      //CREATE TAEMMATE
      const urls = chipData;
      const fieldValue: string = getValues("otherUrls");
      if (fieldValue.length <= 2) {
        return;
      }
      urls.push(fieldValue);
      setChipData(urls);
      const newPort: IPortfolioItem = {
        ...newPortfolio,
        name: getValues("name"),
        description: getValues("description"),
        storeUrl: getValues("storeUrl"),
        otherUrls: chipData,
        highlightImg: "",
        imgs: [],
      };
      setNewPortfolio(newPort);
      setValue("otherUrls", "");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ textAlign: "center" }}>
      {portfolioState.loading ? (
        <CircularProgress style={{ color: THEME_RED }} />
      ) : (
        <Grid container>
          <Grid container item spacing={2} justifyContent="space-between">
            <Grid item xs={12} md={2} className="portfolioPictureFormGridItem">
              <div
                className="portfolioPictureDivParent"
                onClick={handleClickPictureUpload}
              >
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
                {!!portfolioEdited &&
                portfolioEdited.highlightImg &&
                portfolioEdited.highlightImg.length > 0 ? (
                  <>
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    {selectedFile ? (
                      <img
                        src={selectedFile.url}
                        className="portfolioPictureForm"
                        alt="Upload preview"
                      />
                    ) : (
                      <img
                        src={portfolioEdited.highlightImg}
                        className="portfolioPictureForm"
                        alt="Portfolio hightlight preview"
                      />
                    )}
                    {/* <div
                    onClick={handleClickPictureUpload}
                    className="portfolioPictureIconDiv"
                  >
                    <EditIcon className="pictureEditIconOverlay" />
                  </div> */}
                  </>
                ) : (
                  <div style={{ width: "100%", height: "100%" }}>
                    {selectedFile ? (
                      <img
                        src={selectedFile.url}
                        className="portfolioPictureForm"
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
                label="Name"
                register={register("name")}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <LightTextfield
                label="Store URL"
                register={register("storeUrl")}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <LightTextfield
                label="Other URLs"
                register={register("otherUrls")}
                style={{ marginBottom: "4px" }}
                endAdornment={
                  <IconButton onClick={handleClickSaveOtherUrl}>
                    <SaveIcon />
                  </IconButton>
                }
              />
              {!!chipData &&
                chipData.length > 0 &&
                chipData.map((url: string) => (
                  <Chip
                    label={
                      <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        style={{ textDecoration: "none", color: "#4589f5" }}
                      >
                        {url.length > 30 ? url.substring(0, 29) + "..." : url}
                      </a>
                    }
                    style={{ margin: "4px" }}
                    onDelete={(_) => handleOnDeleteRoleChip(url)}
                  />
                ))}
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: "16px" }}>
            <LightTextfield
              required
              multiline
              rows={5}
              maxRows={30}
              label="Description"
              register={register("description")}
            />
          </Grid>
          <Grid container spacing={3} justifyContent="flex-end">
            {!!portfolioEdited && (
              <Grid item xs={6} md={2}>
                <Button
                  variant="outlined"
                  className="portfolioSubmitButton"
                  style={{
                    textAlign: "right",
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
            <Grid item xs={6} md={2}>
              <Button
                variant="outlined"
                className="portfolioSubmitButton"
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
      )}
    </form>
  );
};

export default PortfolioForm;
