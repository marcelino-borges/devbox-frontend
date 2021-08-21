import { call, put, all, takeLatest, StrictEffect } from "redux-saga/effects";
import { ITeamMember, TeamTypes } from "./types";
import * as teamService from "../../services/team-service";
import * as actions from "./actions";

export function* getTeam(): any {
  const { getTeamMembers } = teamService;
  try {
    const response = yield call(getTeamMembers);
    if(response &&
      response.status === 200 &&
      response.data.status !== "error") {
        yield put(actions.getTeamMembersSuccess(response.data));
      }
  } catch(error) {
    yield put(actions.getTeamMembersError(error));
  }
}

export function* createTeammate({ payload }: any): any {
  const { createTeammate } = teamService;
  try {
    const response = yield call(createTeammate, payload);
    if(response &&
      (response.status === 200 ||
      response.status === 201) &&
      response.data.status !== "error") {
        yield put(actions.createTeammateSuccess(response.data));
      }
  } catch(error) {
    yield put(actions.createTeammateError(error));
  }
}

export function* updateTeammate({ payload }: any): any {
  const { updateTeammate } = teamService;
  try {
    const response = yield call(updateTeammate, payload);
    if(response &&
      response.status === 200 &&
      response.data.status !== "error") {
        yield put(actions.updateTeammateSuccess(response.data));
      }
  } catch(error) {
    yield put(actions.updateTeammateError(error));
  }
}

export function* deleteTeammate({ payload }: any): any {
  const { deleteTeammate } = teamService;
  try {
    const response = yield call(deleteTeammate, payload._id, payload.email);
    if(response &&
      response.status === 200 &&
      response.data.status !== "error") {
        yield put(actions.deleteTeammateSuccess(response.data));
      }
  } catch(error) {
    yield put(actions.deleteTeammateError(error));
  }
}

export default function* teamSagas(): Generator<StrictEffect> {
  yield all([
    takeLatest(TeamTypes.GET_TEAM_REQUEST, getTeam),
    takeLatest(TeamTypes.CREATE_TEAMMATE_REQUEST, createTeammate),
    takeLatest(TeamTypes.UPDATE_TEAMMATE_REQUEST, updateTeammate),
    takeLatest(TeamTypes.DELETE_TEAMMATE_REQUEST, deleteTeammate),
  ]);
}
