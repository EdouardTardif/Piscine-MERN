import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';



class Profile extends React.Component {


    constructor(){
        super();
    
    }

    componentDidMount(){
        this.logoutHandler();
        this.props.history.push('/login');

    }
    
    logoutHandler = () => {
        localStorage.removeItem('token');
    };


    render(){
        return (
        <div>
            <h1>Logout class</h1>
        </div>
        )
    }
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
export default Profile;