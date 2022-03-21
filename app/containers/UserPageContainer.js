import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pages } from '../components';
import { logout } from '../actions/auth';
import { isAuthenticated } from '../HOC';

class UserPageContainer extends Component {
  componentDidMount() {
    const { authenticated, params, user, redirectTo } = this.props;
    if (authenticated && params.username !== user.username) {
      this.props.dispatch(logout());
      redirectTo('/login');
    } else if (!authenticated) {
      redirectTo('/login');
    }
  }


  render() {
    return (
      <Pages.UserPage
        user={this.props.user}
      />
    );
  }
}


export default (isAuthenticated(UserPageContainer));
