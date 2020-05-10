import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Test from './test.js';
import Profile from './Profile.js';
import Nav from './Nav.js';
import Home from './Home.js';
import Login from './Login';
import Register from './Register';
import jwt_decode from 'jwt-decode';
import Logout from './Logout';
import Billet from './Billet';
import Myblog from './Myblog';

import Billetinfo from './Billetinfo';




import { BrowserRouter as Router, Switch, Route,Redirect,} from 'react-router-dom';

class App extends React.Component {

  constructor(){
    super();

    this.state = {
      isloggedin : false,
      id : null,
      email : null,
      login : null,
      admin : false,
      logininfo : {}
    }
  }



  checklogin = () => {
      if(localStorage.token){
          // console.log('oui');
          const token = localStorage.token;
          const decoded = jwt_decode(token);
          // console.log(decoded);
          if(decoded){
              // console.log(decoded);
              this.setState({ 
                  isloggedin : true,
                  id : decoded.id,
                  email : decoded.email,
                  login : decoded.login,
                  admin : decoded.admin,
                  logininfo : {
                    isloggedin : true,
                    id : decoded.id,
                    email : decoded.email,
                    login : decoded.login,
                    admin : decoded.admin,
                  }
              })
              return true
          } else {
            return false;
          }
      } else {
        console.log('non');
        return false
      }
  }


componentDidMount() {
  this.checklogin();
  
}

  render(){
    return (
      <Router>
        <div className="App" >
            <Nav isloggedin={this.state.isloggedin} />
            <Switch>
                <Route path="/" exact component={Home}  />
                <Route path="/billet/create" exact>
                  {this.state.isloggedin ? <Billet logininfo={this.state.logininfo} /> : <Login />}
                </Route> />
                <Route path="/myblog" exact>
                  {this.state.isloggedin ? <Myblog logininfo={this.state.logininfo} /> : <Login />}
                </Route> />
                <Route path="/profile" exact >
                  {this.state.isloggedin ? <Profile logininfo={this.state.logininfo} /> : <Login />}
                </Route> />
                <Route path="/myblog/:id" component={this.state.isloggedin ? Billetinfo : Login} />
                <Route path="/test" exact component={Test}  />
                <Route path="/login" exact component={Login}  />
                <Route path="/register" exact component={ Register }  />
                <Route path="/logout" exact component={Logout}  />
            </Switch>
        </div>
      </Router>
      
    )
  }
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
