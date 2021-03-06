import { Routine } from 'redux-saga-routines';
import { fetchPathDataRoutine, changeFavouritePathStateRoutine, checkFavouritePathStateRoutine } from '@screens/PathPage/routines';
import { IPathPageData }  from '@screens/PathPage/models/IPathPageData';

const initialState = {
  path: {} as IPathPageData
};

export const pathData = (state = initialState, action: Routine<any>) => {
  switch (action.type) {
    case fetchPathDataRoutine.SUCCESS: {
      return {
        ...state,
        path: action.payload
      };
    }
    case changeFavouritePathStateRoutine.SUCCESS: {
      return {
        ...state,
          path: {
          ...state.path,
          favourite: action.payload
        }
      };
    }
    case checkFavouritePathStateRoutine.SUCCESS: {
      return {
        ...state,
          path: {
          ...state.path,
          favourite: action.payload
        }
      };
    }
    default:
      return state;
  }
};
