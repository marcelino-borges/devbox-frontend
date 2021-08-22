import { ITeamMember, ITeamStates, TeamTypes } from "./types";

const initialState: ITeamStates = {
  error: undefined,
  loading: false,
  teamMembers: [],
  showFailToast: undefined,
  showSuccessToast: undefined,
}

function reducer(state = initialState, action: any): ITeamStates {
  switch(action.type) {
    // GET ALL
    case TeamTypes.GET_TEAM_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }
    case TeamTypes.GET_TEAM_SUCCESS: {
      return {
        ...state,
        loading: false,
        teamMembers: action.payload,
      }
    }
    case TeamTypes.GET_TEAM_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }
    // CREATE
    case TeamTypes.CREATE_TEAMMATE_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }
    case TeamTypes.CREATE_TEAMMATE_SUCCESS: {
      const returnedPayload: ITeamMember = action.payload;
      const stateMembers = state.teamMembers;
      stateMembers.push(returnedPayload);
      return {
        ...state,
        loading: false,
        teamMembers: [ ...stateMembers ],
        showSuccessToast: "Teammate successfully created!",
      }
    }
    case TeamTypes.CREATE_TEAMMATE_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
        showFailToast: "Error creating teammate!",
      }
    }
    // EDIT
    case TeamTypes.UPDATE_TEAMMATE_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }
    case TeamTypes.UPDATE_TEAMMATE_SUCCESS: {
      const returnedPayload: ITeamMember = action.payload;
      return {
        ...state,
        loading: false,
        teamMembers: state.teamMembers.map(member => {
          if(member._id !== returnedPayload._id)
            return member;
          else
            return returnedPayload;
        }),
        showSuccessToast: "Teammate successfully updated!",
      }
    }
    case TeamTypes.UPDATE_TEAMMATE_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
        showFailToast: "Error updating teammate!",
      }
    }
    // DELETE
    case TeamTypes.DELETE_TEAMMATE_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }
    case TeamTypes.DELETE_TEAMMATE_SUCCESS: {
      const returnedPayload: ITeamMember = action.payload;
      return {
        ...state,
        loading: false,
        teamMembers: state.teamMembers.filter(member => member._id !== returnedPayload._id),
        showSuccessToast: "Teammate successfully deleted!",
      }
    }
    case TeamTypes.DELETE_TEAMMATE_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
        showFailToast: "Error deleting teammate!",
      }
    }
    case TeamTypes.SHOW_SUCCESS_TOAST: {
      return {
        ...state,
        loading: false,
        showSuccessToast: action.payload,
      }
    }
    case TeamTypes.SHOW_FAIL_TOAST: {
      return {
        ...state,
        loading: false,
        showFailToast: action.payload,
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
