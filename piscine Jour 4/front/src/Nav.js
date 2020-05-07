import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import {Link} from 'react-router-dom';


class Nav extends React.Component {


    render(){
        return (
        <nav>
            <h1>Profile class</h1>
            <ul className="nav-links">
                <Link to="/profile">
                    <li>Profile</li>
                </Link>
                <Link to="/login">
                    <li>Login</li>
                </Link>
            </ul>
        </nav>
        )
    }
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
export default Nav;