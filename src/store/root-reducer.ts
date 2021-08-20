import { combineReducers } from 'redux';

import portfolio from "./portfolio/reducer";
import team from "./team/reducer";
import user from "./firebase/reducer";
import file from "./file-upload/reducer";

import { IPortfolioStates } from './portfolio/types';
import { ITeamStates } from './team/types';
import { ISignInStates } from './firebase/types';
import { IFileUploadStates } from './file-upload/types';

export interface IApplicationState {
  portfolio: IPortfolioStates;
  team: ITeamStates;
  user: ISignInStates;
  file: IFileUploadStates;
}

export default combineReducers({
  portfolio,
  team,
  user,
  file,
});
