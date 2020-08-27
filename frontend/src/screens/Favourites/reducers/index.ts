import { combineReducers } from 'redux';
import { fetchFavouriteAuthorsRoutine, fetchFavouriteCoursesRoutine, fetchFavouriteLecturesRoutine } from '../routines';
import { reducerCreator } from 'helpers/reducer.helper';
import { data } from '../containers/FavouritesPage/reducer';

const requests = combineReducers({
  authorsRequest: reducerCreator([fetchFavouriteAuthorsRoutine.TRIGGER]),
  lecturesRequest: reducerCreator([fetchFavouriteLecturesRoutine.TRIGGER]),
  coursesRequest: reducerCreator([fetchFavouriteCoursesRoutine.TRIGGER])
});

export default combineReducers({
  data,
  requests
});