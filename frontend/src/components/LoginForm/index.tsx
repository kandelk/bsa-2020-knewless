import { Button, Divider, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { FACEBOOK_AUTH_URL, GOOGLE_AUTH_URL } from '../../screens/Authentication/constants';
import React, { FunctionComponent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IBindingCallback1 } from '../../models/Callbacks';
import { ILoginRequest } from '../../screens/Authentication/containers/LoginPage';
import LogoWithText from '../LogoWithText';

import styles from './styles.module.sass';

interface ILoginForm {
  login: IBindingCallback1<ILoginRequest>;
  isLoginFailure: boolean;
  isLoginLoading: boolean;
}

const LoginForm: FunctionComponent<ILoginForm> = ({
  login,
  isLoginFailure,
  isLoginLoading
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailChanged = data => {
    setEmail(data);
  };

  const passwordChanged = data => {
    setPassword(data);
  };

  const handleLoginClick = () => {
    login({ email, password });
  };

  return (
    <Grid textAlign="center" className={styles.main_container}>
      <Grid.Column className={styles.main_container__column}>
        <Header as="h2" textAlign="center" className={styles.main_container__header}>
          <LogoWithText />
        </Header>
        <Form name="loginForm" size="large" onSubmit={handleLoginClick}>
          <Segment className={styles.main_container__form}>
            <Form.Input
              fluid
              icon="at"
              iconPosition="left"
              placeholder="Email"
              type="email"
              labelPosition="left"
              label="Email"
              onChange={ev => emailChanged(ev.target.value)}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              labelPosition="left"
              label="Password"
              onChange={ev => passwordChanged(ev.target.value)}
            />
            <div>
              <Button
                type="submit"
                fluid
                size="large"
                loading={isLoginLoading}
                primary
                className={styles.main_container__button_login}
              >
                LOGIN
              </Button>
              <Divider className={styles.main_container__divider} horizontal>Or</Divider>
              <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
                <Button circular type="button" icon="google" color="google plus" />
              </a>
              <a className="btn btn-block social-btn facebook" href={FACEBOOK_AUTH_URL}>
                <Button circular type="button" icon="facebook official" color="facebook" />
              </a>
            </div>
          </Segment>
        </Form>
        <Message className={styles.main_container__signUp_message}>
          New to us?
          {' '}
          <NavLink exact to="/register">Sign Up</NavLink>
        </Message>
        <Message error hidden={!isLoginFailure} className={styles.main_container__error_message}>
          Username or password is incorrect
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default LoginForm;