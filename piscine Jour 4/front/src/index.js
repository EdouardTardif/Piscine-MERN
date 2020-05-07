import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Test from './test.js';
import Profile from './Profile.js';
import Nav from './Nav.js';
import Home from './Home.js';
import Login from './Login';





import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

class App extends React.Component {
  render(){
    return (
      <Router>
        <div className="App">
            <Nav />
            <Switch>
                <Route path="/" exact component={Home}  />
                <Route path="/profile" component={Profile}  />
                <Route path="/test" component={Test}  />
                <Route path="/login" component={Login}  />
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
