import React, { Component } from 'react';
import { BrowserRouter, Switch, Redirect, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';
import Homepage from './Homepage';
import LoginScreen from './LoginScreen';
import PrivateRoute from './PrivateRoute.js';


class App extends Component {
  constructor() {
    super();
    this.state = { searchTerm: '', listOfJObs: []};
    this.search = this.search.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);

  }

  onSearchChange (event) {
    this.setState({ searchTerm: event.target.value });
  }

  search () {
    // let body = { searchterm: "developer" };
    // if (!this.state.searchTerm) return; 
    let body = { searchterm: this.state.searchTerm };
    fetch ('/searchbar', {
      method: 'post',
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    })
    .then( resp => {
      console.log('hey');
      console.log(resp);
      // if (resp.status === 200) {
      //   console.log(resp.json());
      //   this.setState({listOfJobs: resp.json()})
      // }
      // if (resp.status === 404) {
      //   console.log(err);
      // }
      return resp.json();
    }).then(data=>console.log(data)).catch( err => console.log(err) );
  }

  render () {
    return (
      <BrowserRouter >
        <Switch>
          <Route exact path="/" render={ () => ( <LoginScreen /> ) } />
          <Route path="/register" render={ () => {} } />
          <PrivateRoute path="/home" component={Homepage} isAuth={true} search={this.search} onSearchChange={this.onSearchChange} />
        </Switch>
      </BrowserRouter>
    )
  };
} 


ReactDOM.render(
    < App />,
    document.getElementById('root')
);