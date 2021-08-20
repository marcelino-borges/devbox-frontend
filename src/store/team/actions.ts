import { action } from "typesafe-actions";
import { ITeamMember, TeamTypes } from "./types";

export const getTeamMembersRequest = (): any => action(TeamTypes.GET_TEAM_REQUEST);
export const getTeamMembersSuccess = (payload: any): any => action(TeamTypes.GET_TEAM_SUCCESS, payload);
export const getTeamMembersError = (payload: any): any => action(TeamTypes.GET_TEAM_ERROR, payload);

export const createTeammateRequest = (payload: ITeamMember): any => action(TeamTypes.CREATE_TEAMMATE_REQUEST, payload);
export const createTeammateSuccess = (payload: any): any => action(TeamTypes.CREATE_TEAMMATE_SUCCESS, payload);
export const createTeammateError = (payload: any): any => action(TeamTypes.CREATE_TEAMMATE_ERROR, payload);

export const updateTeammateRequest = (payload: ITeamMember): any => action(TeamTypes.UPDATE_TEAMMATE_REQUEST, payload);
export const updateTeammateSuccess = (payload: any): any => action(TeamTypes.UPDATE_TEAMMATE_SUCCESS, payload);
export const updateTeammateError = (payload: any): any => action(TeamTypes.UPDATE_TEAMMATE_ERROR, payload);

export const deleteTeammateRequest = (payload: ITeamMember): any => action(TeamTypes.DELETE_TEAMMATE_REQUEST, payload);
export const deleteTeammateSuccess = (payload: any): any => action(TeamTypes.DELETE_TEAMMATE_SUCCESS, payload);
export const deleteTeammateError = (payload: any): any => action(TeamTypes.DELETE_TEAMMATE_ERROR, payload);

export const setShowFailToast = (payload: string | undefined): any => action(TeamTypes.SHOW_FAIL_TOAST, payload);
export const setShowSuccessToast = (payload: string | undefined): any => action(TeamTypes.SHOW_SUCCESS_TOAST, payload);
