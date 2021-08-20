import { action } from "typesafe-actions";
import { FileUploadTypes, IDeleteFileImgParams, IUploadFileImgParams } from "./types";

export const uploadImgRequest = (payload: IUploadFileImgParams): any => action(FileUploadTypes.UPLOAD_IMG_REQUEST, payload);
export const uploadImgSuccess = (payload: any): any => action(FileUploadTypes.UPLOAD_IMG_SUCCESS, payload);
export const uploadImgError = (payload: any): any => action(FileUploadTypes.UPLOAD_IMG_ERROR, payload);

export const deleteImgRequest = (payload: IDeleteFileImgParams): any => action(FileUploadTypes.DELETE_IMG_REQUEST, payload);
export const deleteImgSuccess = (payload: any): any => action(FileUploadTypes.DELETE_IMG_SUCCESS, payload);
export const deleteImgError = (payload: any): any => action(FileUploadTypes.DELETE_IMG_ERROR, payload);

export const clearTempUploadedImgUrl = (): any => action(FileUploadTypes.UPLOAD_IMG_ERROR);
