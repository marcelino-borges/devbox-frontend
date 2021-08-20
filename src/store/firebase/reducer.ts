import { PlaylistAddOutlined } from "@material-ui/icons";
import { ISignInStates, SignInTypes } from "./types";

const initialState: ISignInStates = {
  error: undefined,
  loading: false,
  user: {
    email: "",
  },
  isLoggedIn: false,
}

function reducer(state = initialState, action: any): ISignInStates {
  switch(action.type) {
    case SignInTypes.SIGNIN_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case SignInTypes.SIGNIN_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    case SignInTypes.SET_AUTHENTICATED_USER: {
      return {
        ...state,
        loading: false,
        error: initialState.error,
        user: action.payload,
        isLoggedIn: true,
      };
    }
    case SignInTypes.SET_USER_COMPLEMENTARY_DATA: {
      return {
        ...state,
        loading: false,
        error: initialState.error,
        user: {
          ...state.user,
          displayName: action.payload.firstName + " " + action.payload.lastName,
          photoURL: action.payload.picture,
        },
        isLoggedIn: true,
      };
    }
    case SignInTypes.SIGNOUT: {
      return {
        ...state,
        loading: false,
        error: initialState.error,
        user: initialState.user,
        isLoggedIn: false,
      };
    }
    default: {
      return state;
    }
  }
}

export default reducer;
