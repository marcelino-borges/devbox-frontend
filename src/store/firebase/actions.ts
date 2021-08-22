import { action } from "typesafe-actions";
import { ITeamMember } from "../team/types";
import { IFirebaseUser, SignInTypes } from "./types";

export const signInLoading = (): any => action(SignInTypes.SIGNIN_REQUEST);
export const signInError = (payload: any): any => action(SignInTypes.SIGNIN_ERROR, payload);
export const setAuthenticatedUser = (payload: IFirebaseUser): any => action(SignInTypes.SET_AUTHENTICATED_USER, payload);
export const clearAuthenticatedUser = (): any => action(SignInTypes.CLEAR_AUTHENTICATED_USER);
export const setUserComplementaryData = (payload: ITeamMember): any => action(SignInTypes.SET_USER_COMPLEMENTARY_DATA, payload);
export const signOut = (): any => action(SignInTypes.SIGNOUT);
