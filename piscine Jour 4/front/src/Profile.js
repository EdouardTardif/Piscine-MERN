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
            password : null,
            error : {},
            isloggedin : false,
        }
        this.isconnected();
    }

    isconnected = async () => {
        const response = await axios.get('http://localhost:4242/checkToken');
        if(response.status == 200){
            this.setState({isloggedin : true});
        }
        // if(response.data.isloggedin){
        //     this.setState({isloggedin : response.data.isloggedin, _id :  response.data._id});
        // } else {
        //     this.setState({isloggedin : response.data.isloggedin});
        // }
       
        console.log(response);
    }

    render(){
        return (
        <div>
            <h1>Profile class</h1>
            {this.state.isloggedin ? <h2>je suis connecte</h2> : <h2>je suis pas connecte</h2>}
        </div>
        )
    }
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
export default Profile;