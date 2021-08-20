import axios from "axios";
import { IDeleteFileImgParams, IUploadFileImgParams } from "../store/file-upload/types";

export const uploadImg = async (file: IUploadFileImgParams): Promise<string> => {
  const formData = new FormData();
  formData.append('img', file.img);
  formData.append('userSenderName', file.userSenderName);
  return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/files/img/`,
  formData,
  { headers: { 'Content-Type': 'multipart/form-data' } });
}

export const deleteImg = async (params: IDeleteFileImgParams): Promise<string> => {
  return await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/files/img?url=${params.url}&completePath=${params.completePath}&path=${params.path}&fileName=${params.fileName}`);
}
