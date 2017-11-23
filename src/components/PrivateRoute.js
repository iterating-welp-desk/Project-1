import React, { Component } from 'react';
import { BrowserRouter as Route, Redirect } from 'react-router-dom';

class PrivateRoute extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log('inside of Private Route', this.props);
    return (
      <Route render={ props => { return ((this.props.isAuth) ? <Redirect to='/home' /> : <Redirect to='/' />) } } />
    );
  }
}

export default PrivateRoute;
