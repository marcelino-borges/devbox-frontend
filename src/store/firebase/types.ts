export enum SignInTypes {
  // SIGNIN
  SIGNIN_ERROR = "@signin/SIGNIN_ERROR",
  SIGNIN_REQUEST = "@signin/SIGNIN_REQUEST",
  SET_AUTHENTICATED_USER = "@signin/SET_AUTHENTICATED_USER",
  CLEAR_AUTHENTICATED_USER = "@signin/CLEAR_AUTHENTICATED_USER",
  SET_USER_COMPLEMENTARY_DATA = "@signin/SET_USER_COMPLEMENTARY_DATA",
  SIGNOUT = "@signin/SIGNOUT",
}

export interface IFirebaseUser {
  email: string;
  displayName?: string | null;
  phoneNumber?: any | null;
  photoURL?: any | null;
  refreshToken?: string | null;
  uid?: string | null;
  emailVerified?: boolean | null;
  isAnonymous?: boolean | null;
  apiKey?: string | null;
  authDomain?: string | null;
  lastLoginAt?: string | null;
  createdAt?: string | null;

}

export interface ISignInStates {
  loading: boolean;
  error: any;
  user?: IFirebaseUser;
  isLoggedIn: boolean;
}
