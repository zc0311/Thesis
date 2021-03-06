import React from 'react';
import Auth0Lock from 'auth0-lock';
import config from '../../environment';

class Login extends React.Component {
  constructor(clientId, domain) {
    super();
    // Configure Auth0
    this.lock = new Auth0Lock(config.AUTH_ID, config.AUTH_CLIENT, {
      auth: {
        redirectUrl: 'http://localhost:8000/login',
        responseType: 'token',
      },
    });
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this.doAuthentication.bind(this));
    // binds login functions to keep this context
    this.login = this.login.bind(this);
  }

  doAuthentication(authResult) {
    // Saves the user token
    this.setToken(authResult.idToken);
    // navigate to the home route
    // browserHistory.replace('/home');
  }

  login() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    return !!this.getToken();
  }

  setToken(idToken) {
    // Saves user token to local storage
    localStorage.setItem('id_token', idToken);
  }

  getToken() {
    // Retrieves the user token from local storage
    return localStorage.getItem('id_token');
  }

  logout() {
    // Clear user token and profile data from local storage
    localStorage.removeItem('id_token');
  }

  render() {
    return (
      <div>
        <button onClick={this.login}>Login</button>
      </div>
    );
  }
}

export default Login
;