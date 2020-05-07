import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';



class Login extends React.Component {


    state = {
        users : []
    }



    render(){
        return (
        <div>
            <form method="POST" action="http://localhost:4242/login/test">
                <ul>
                    <li>
                        <label htmlFor="email">email</label><br></br>
                        <input type="email" name="email" id="email"></input>
                    </li>
                    <li>
                        <label htmlFor="password">password</label><br></br>
                        <input type="text" name="password" id="password"></input>
                    </li>
                </ul>
                <input type="submit" value="S'inscrire"></input>
            </form>
        </div>
        )
    }
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
export default Login;