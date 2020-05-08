import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Redirect,} from 'react-router-dom';



class Login extends React.Component {

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
    

    handleInputChange = e => {
        this.setState({
          [e.target.name]: e.target.value,
        });
     //    console.log(this.state);
    };

    register = async () => {
        if(this.state.email != null && this.state.password != null && this.state.login != null){
            const form = {
                login : this.state.login,
                email : this.state.email,
                password : this.state.password,
                password2 : this.state.password2,
            }
            const response = await axios.post( 'http://localhost:4242/register', form, { headers: { 'Content-Type': 'application/json' } } )
            if(response.data.isloggedin){
                this.setState({isloggedin : response.data.isloggedin});
            } else {
                this.setState({error : response.data.error});
            }
           
            console.log(response.data);
        }
    }

    render(){
        if(this.state.isloggedin){
            return <Redirect to="/profile" />;
        }
        return (
        <div>
                <ul>
                    <li>
                        <label htmlFor="login">login</label><br></br>
                        <input onChange={this.handleInputChange} type="text" name="login" id="login"></input>
                    </li>
                    <li>
                        <label htmlFor="email">email</label><br></br>
                        <input onChange={this.handleInputChange} type="email" name="email" id="email"></input>
                    </li>
                    
                    <li>
                        <label htmlFor="password">password</label><br></br>
                        <input onChange={this.handleInputChange} type="text" name="password" id="password"></input>
                        {/* <h3>{this.state.error}</h3> */}
                    </li>
                    <li>
                        <label htmlFor="password2">Repeat password</label><br></br>
                        <input onChange={this.handleInputChange} type="text" name="password2" id="password2"></input>
                        {/* <h3>{this.state.error}</h3> */}
                    </li>
                    {/* {this.state.error.map(e => <li>{e}</li> )} */}
                </ul>

                <button onClick={this.register} value="S'inscrire">S'Inscrire</button>
        </div>
        )
    }
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
export default Login;