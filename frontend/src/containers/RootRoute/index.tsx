import React, { useEffect } from 'react';
import { IAppState } from '@models/AppState';
import { connect } from 'react-redux';
import PublicRoute from '@components/PublicRoute';
import LandingPage from '@screens/Landing/containers/LandingPage';
import { IUser } from '../AppRouter/models/IUser';
import { RoleTypes } from '../AppRouter/models/IRole';
import MainAuthorPage from '@screens/AuthorMainPage/containers/MainPage';
import MainStudentPage from '@screens/MainPage/containers/MainStudentPage';

interface IRootRouteProps {
  user: IUser;
  isAuthorized: boolean;
  exact: boolean;
  path: string;
}

const RootRoute: React.FunctionComponent<IRootRouteProps> = props => {
  const { isAuthorized, user } = props;
  let currentComponent: React.FunctionComponent = () => null;
  
  if (!isAuthorized) {
    currentComponent = LandingPage;
  } else if (isAuthorized && user.role) {
    if (user.role.name === RoleTypes[RoleTypes.AUTHOR]) {
      currentComponent = MainAuthorPage;
    } else if (user.role.name === RoleTypes[RoleTypes.USER]) {
      currentComponent = MainStudentPage;
    }
  }
  
  return (
    <PublicRoute {...props} component={currentComponent} />
  );
};

const mapStateToProps = (state: IAppState) => {
  const { user } = state.appRouter;
  const { isAuthorized } = state.auth.auth;
  return {
    user,
    isAuthorized
  };
};

export default connect(mapStateToProps)(RootRoute);
