import { IFirebaseUser, ISignInStates, SignInTypes } from "./types";

const initialState: ISignInStates = {
  error: undefined,
  loading: false,
  isLoggedIn: false,
  user: undefined,
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
      const firebaseUser: IFirebaseUser = {
        email: action.payload.email,
        displayName: action.payload.displayName,
        phoneNumber: action.payload.phoneNumber,
        photoURL: action.payload.photoURL,
        refreshToken: action.payload.refreshToken,
        uid: action.payload.uid,
        emailVerified: action.payload.emailVerified,
        isAnonymous: action.payload.isAnonymous,
        apiKey: action.payload.apiKey,
        authDomain: action.payload.authDomain,
        lastLoginAt: action.payload.lastLoginAt,
        createdAt: action.payload.createdAt,
      };

      return {
        ...state,
        loading: false,
        error: initialState.error,
        user: firebaseUser,
        isLoggedIn: true,
      };
    }
    case SignInTypes.CLEAR_AUTHENTICATED_USER: {
      return {
        ...state,
        loading: false,
        user: undefined,
        isLoggedIn: false,
      };
    }
    case SignInTypes.SET_USER_COMPLEMENTARY_DATA: {
      return {
        ...state,
        loading: false,
        error: initialState.error,
        user: {
          ...state.user as IFirebaseUser,
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
