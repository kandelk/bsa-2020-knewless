import { combineReducers } from 'redux';
import { reducerCreator } from 'helpers/reducer.helper';
import { mainPageData } from '../containers/MainStudentPage/reducer';
import {
  fetchContinueCoursesRoutine, fetchPathsRoutine, fetchRecommendedCoursesRoutine
} from '../routines';

const requests = combineReducers({
  continueCoursesRequest: reducerCreator(
    [fetchContinueCoursesRoutine.TRIGGER]
  ),
  recommendedCoursesRequest: reducerCreator(
    [fetchRecommendedCoursesRoutine.TRIGGER]
  ),
  pathsRequest: reducerCreator(
    [fetchPathsRoutine.TRIGGER]
  )
});

export default combineReducers({
  mainPageData,
  requests
});