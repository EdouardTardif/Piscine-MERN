import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import { BrowserRouter as Router, Link, Switch, Route, Redirect,} from 'react-router-dom';



class Profilebillet extends React.Component {

    constructor(props){
        super();
    
        this.state = {
            
            error : [],
            isloggedin : false,
            billets : null,
        }
        
    }
    
    componentDidMount(){
        this.fetchblog();
    }

    fetchblog = async () => {
            const form = {
                id : this.props.logininfo.id,
            }
            // console.log('test');
            const response = await axios.post( 'http://localhost:4242/myblog', form, { headers: { 'Content-Type': 'application/json' } } )
            // console.log(response);
            if(response.status == 200){
                const data = response.data;
                this.setState({billets : data});
                // console.log(this.state.billets.allbillet)
            } else {
                const error = new Error(response.error);
                throw error;
            }
    }



    render(){
        if(this.state.isloggedin){
            this.props.history.push('/profile');
        }
        return (
        <div>
            <h1>Myblog CONTROLLER</h1>
                <ul>
                        { this.state.billets != null && this.state.billets.allbillet.length > 0 ? this.state.billets.allbillet.map( e => 
                            <Link key={e._id} to={"/myblog/"+ e._id}>
                                <li>{e.titre}</li>
                            </Link>
                            ) 
                        : <li key='test'> Vous n'avez aucun billet</li>}
                </ul>
        </div>
        )
    }
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
export default Profilebillet;