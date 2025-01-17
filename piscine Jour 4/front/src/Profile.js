import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';



class Profile extends React.Component {


    constructor(){
        super();
    
        this.state = {
            login : null,
            email : null,
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

    componentDidMount() {
        this.setState({ login : this.props.logininfo.login, email : this.props.logininfo.email, id : this.props.logininfo.id})
    }

    register = async () => {
        if(this.state.email != null && this.state.login != null){
            const form = {
                id : this.state.id,
                login : this.state.login,
                email : this.state.email,
            }
            const response = await axios.post( 'http://localhost:4242/user/update', form, { headers: { 'Content-Type': 'application/json' } } )
            if(response.status == 200){
                const data = response.data;
                localStorage.removeItem('token');
                localStorage.setItem('token', data.token);
                this.setState({isloggedin : true});
            } else {
                this.setState({error : response.data.error});
            }
           
            console.log(response.data);
        }
    }


    delete = async () => {
            const form = {
                id : this.state.id 
            };

            const response = await axios.post( 'http://localhost:4242/user/delete', form, { headers: { 'Content-Type': 'application/json' } } )
            if(response.status == 200){
                const data = response.data;
                localStorage.removeItem('token');
                this.props.history.push('/login');
                // this.setState({isloggedin : false});
            } else {
                this.setState({error : response.data.error});
            }
            console.log(response.data);
    }


    render(){
        return (
            <div>
                <h1>PROFILE CONTROLLER</h1>
            <ul>
                <li>
                    <label htmlFor="login">login</label><br></br>
                    <input onChange={this.handleInputChange} type="text" name="login" id="login" defaultValue={this.props.logininfo.login}></input>
                </li>
                <li>
                    <label htmlFor="email">email</label><br></br>
                    <input onChange={this.handleInputChange} type="email" name="email" id="email" defaultValue={this.props.logininfo.email}></input>
                </li>
                {/* {this.state.error.map(e => <li>{e}</li> )} */}
            </ul>

            <button onClick={this.register} value="S'inscrire">Update</button>

            <button onClick={this.delete} value="DELETE PROFILE">DELETE PROFILE</button>
        </div>

        )
    }
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
export default Profile;