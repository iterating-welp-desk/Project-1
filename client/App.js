import React, { Component } from 'react';
import createHistory from 'history/createBrowserHistory'
import { BrowserRouter, Switch, Redirect, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';
import Homepage from './Homepage';
import LoginScreen from './LoginScreen';
import PrivateRoute from './PrivateRoute.js';

const history = createHistory();
const location = history.location;
class App extends Component {
  constructor() {
    super()
    this.search = this.search.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.state ={searchTerm: '', listOfJObs: [], username:'', password:'' ,isAuth: false};
    //changes state of input
     this.onUsernameChange = this.onUsernameChange.bind(this);
     this.onPasswordChange = this.onPasswordChange.bind(this);
    //this is API to our server 
    this.logIntoPage = this.logIntoPage.bind(this);
  }

  onUsernameChange (event){
    this.setState({username: event.target.value});
  }
  onPasswordChange(event){
    this.setState({password: event.target.value});
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

  logIntoPage(){
    console.log('heyyyy')
    let body = { username: this.state.username, password:this.state.password };
    console.log('bodddyyyy>>>',body)
    fetch('/login',{
      method:'post',
      body: JSON.stringify(body),
      headers:{ "Content-Type":"application/json"}
    })
    .then(resp =>{
      if(resp.status === 200){
        this.setState({isAuth : true})
        fetch('/home')
        // console.log('logging HISTORY BEFORE',history)
        // history.push('/home')
        // console.log('logging HISTORY AFTER PUSH',history)
        // history.goBack();
      }
      if(resp.status === 401){
        this.setState({isAuth:false})
      }
      console.log('consoling inside of  stt',this.state)
    })
    .catch(err => console.log(err));
  }
  render () {
    return (
      <BrowserRouter >
        <Switch>
          <Route exact path="/" render={ () => ( <LoginScreen logIntoPage={this.logIntoPage} onPasswordChange={this.onPasswordChange} onUsernameChange={this.onUsernameChange}/> ) } />
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