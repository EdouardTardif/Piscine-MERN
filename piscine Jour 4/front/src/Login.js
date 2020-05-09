import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Redirect,} from 'react-router-dom';



class Login extends React.Component {

    constructor(props){
        super();
    
        this.state = {
            users : [],
            email : null,
            password : null,
            error : [],
            isloggedin : false,
        }
    }
    

    handleInputChange = e => {
        this.setState({
          [e.target.name]: e.target.value,
        });
        console.log(this.state);
    };


    








    logoutHandler = () => {
        this.setState({ isAuth: false, token: null });
        localStorage.removeItem('token');
        localStorage.removeItem('expiryDate');
        localStorage.removeItem('userId');
    };


    login = async () => {
        if(this.state.email != null && this.state.password != null){
            const form = {
                email : this.state.email,
                password : this.state.password,
            }
            const response = await axios.post( 'http://localhost:4242/login/test', form, { headers: { 'Content-Type': 'application/json' } } )
            if(response.status == 200){
                const data = response.data;
                // console.log('oui');
                localStorage.setItem('token', data.token);
                // localStorage.setItem('userId', data.userId);
                // const remainingMilliseconds = 60 * 60 * 1000;
                // const expiryDate = new Date(
                //     new Date().getTime() + remainingMilliseconds
                // );
                // localStorage.setItem('expiryDate', expiryDate.toISOString());
                this.setState({isloggedin : true});
            } else {
                const error = new Error(response.error);
                throw error;
            }
        }
    }

    render(){
        if(this.state.isloggedin){
            this.props.history.push('/profile');
        }
        return (
        <div>
            <h1>LOGIN CONTROLLER</h1>
                <ul>
                    <li>
                        <label htmlFor="email">email</label><br></br>
                        <input onChange={this.handleInputChange} type="email" name="email" id="email"></input>
                    </li>
                    <li>
                        <label htmlFor="password">password</label><br></br>
                        <input onChange={this.handleInputChange} type="text" name="password" id="password"></input>
                        <h3>{this.state.error}</h3>
                    </li>
                </ul>
                <button onClick={this.login} value="S'inscrire">se Connecter</button>
        </div>
        )
    }
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
export default Login;