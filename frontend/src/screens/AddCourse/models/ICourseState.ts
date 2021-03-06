import { IRequestState } from '@models/IRequestState';
import { ICourseData } from './ICourseData';

export interface ICourseState {
    requests: {
      dataRequest: IRequestState;
      tagsRequest: IRequestState;
      editCourseRequest: IRequestState;
      saveCourseRequest: IRequestState;
      savingEditedCourseRequest: IRequestState;
    };
    data: ICourseData;
}
