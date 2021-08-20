export enum TeamTypes {
  //GET ALL
  GET_TEAM_REQUEST="@team/GET_TEAM_REQUEST",
  GET_TEAM_SUCCESS ="@team/GET_TEAM_SUCCESS",
  GET_TEAM_ERROR ="@team/GET_TEAM_ERROR",
  //CREATE
  CREATE_TEAMMATE_REQUEST ="@team/CREATE_TEAMMATE_REQUEST",
  CREATE_TEAMMATE_SUCCESS ="@team/CREATE_TEAMMATE_SUCCESS",
  CREATE_TEAMMATE_ERROR ="@team/CREATE_TEAMMATE_ERROR",
  //EDIT
  UPDATE_TEAMMATE_REQUEST ="@team/UPDATE_TEAMMATE_REQUEST",
  UPDATE_TEAMMATE_SUCCESS ="@team/UPDATE_TEAMMATE_SUCCESS",
  UPDATE_TEAMMATE_ERROR ="@team/UPDATE_TEAMMATE_ERROR",
  //DELETE
  DELETE_TEAMMATE_REQUEST ="@team/DELETE_TEAMMATE_REQUEST",
  DELETE_TEAMMATE_SUCCESS ="@team/DELETE_TEAMMATE_SUCCESS",
  DELETE_TEAMMATE_ERROR ="@team/DELETE_TEAMMATE_ERROR",

  SHOW_SUCCESS_TOAST ="@team/SHOW_SUCCESS_TOAST",
  SHOW_FAIL_TOAST ="@team/SHOW_ERROR_TOAST",
}

export interface ITeamMember {
  _id?: string,
  firstName: string,
  lastName: string,
  mainRole: string,
  email: string,
  secondaryRoles: string[],
  memberSince: Date,
  picture: string,
}

export interface ITeamStates {
  loading: boolean;
  error: any;
  teamMembers: ITeamMember[];
  showSuccessToast?: string;
  showFailToast?: string;
  tempUrlUploadedPicture?: string;
}
