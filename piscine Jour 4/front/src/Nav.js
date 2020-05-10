import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import {Link, withRouter} from 'react-router-dom';


class Nav extends React.Component {

    constructor(){
        super();
        this.state = {
            login : null,
            email : null,
            password : null,
            error : {},
            isloggedin : false,
        }
    }

    style = {
        color: 'white'
    }
    render(){
        return (
        <nav>
            <h1>Profile class</h1>
            <ul className="nav-links">
                <Link style={this.style} to="/profile">
                    <li>Profile</li>
                </Link>
                <Link style={this.style} to="/blogs">
                    <li>all blogs</li>
                </Link>
                <Link style={this.style} to="/myblog">
                    <li>My blog</li>
                </Link>
                <Link style={this.style} to="/billet/create">
                    <li>Create a billet</li>
                </Link>
                {this.props.isloggedin ? null :  <Link style={this.style} to="/login">Login</Link>}
                {this.props.isloggedin ? <Link style={this.style} to="/logout">Logout</Link> : <Link style={this.style} to="/register">Register</Link>}
                {this.props.isloggedin ? <li>je suis connecte</li> : <li>je pas suis connecte</li>}
            </ul>
        </nav>
        )
    }
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
export default Nav;