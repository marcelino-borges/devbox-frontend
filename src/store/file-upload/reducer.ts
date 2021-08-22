import { FileUploadTypes, IFileUploadStates } from "./types";

const initialState: IFileUploadStates = {
  error: undefined,
  loading: false,
}

function reducer(state = initialState, action: any): IFileUploadStates {
  switch(action.type) {
    // UPLOAD
    case FileUploadTypes.UPLOAD_IMG_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }
    case FileUploadTypes.UPLOAD_IMG_SUCCESS: {
      return {
        ...state,
        loading: false,
        tempUploadedFileUrl: action.payload,
        lastUploadedImg: action.payload,
      }
    }
    case FileUploadTypes.UPLOAD_IMG_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
        showFailToast: "Error uploading image!",
      }
    }
    // DELETE
    case FileUploadTypes.DELETE_IMG_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }
    case FileUploadTypes.DELETE_IMG_SUCCESS: {
      return {
        ...state,
        loading: false,
        showSuccessToast: "Image successfully deleted!",
      }
    }
    case FileUploadTypes.DELETE_IMG_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
        showFailToast: "Error deleting image!",
      }
    }
    case FileUploadTypes.CLEAR_TEMP_URL_UPLOADED_FILE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
        tempUploadedFileUrl: undefined,
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}

export default reducer;
