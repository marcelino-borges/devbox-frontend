export enum FileUploadTypes {
  //GET ALL
  UPLOAD_IMG_REQUEST = "@fileUpload/IMG_UPLOAD_REQUEST",
  UPLOAD_IMG_SUCCESS = "@fileUpload/IMG_UPLOAD_SUCCESS",
  UPLOAD_IMG_ERROR = "@fileUpload/IMG_UPLOAD_ERROR",

  DELETE_IMG_REQUEST = "@fileUpload/DELETE_IMG_REQUEST",
  DELETE_IMG_SUCCESS = "@fileUpload/DELETE_IMG_SUCCESS",
  DELETE_IMG_ERROR = "@fileUpload/DELETE_IMG_ERROR",

  CLEAR_TEMP_URL_UPLOADED_FILE = "@fileUpload/CLEAR_TEMP_URL_UPLOADED_FILE",
}

export interface IUploadFileImgParams {
  img: any;
  userSenderName: string;
}

export interface IDeleteFileImgParams {
  url?: string;
  completePath?: string;
  path?: string;
  fileName?: string;
}

export interface IFileUploadStates {
  loading: boolean;
  error: any;
  tempUploadedFileUrl?: string;
  showFailToast?: string;
  showSuccessToast?: string;
  lastUploadedImg?: string;
}
