import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Redirect,} from 'react-router-dom';



class Billetinfo extends React.Component {

    constructor(props){
        super();
    
        this.state = {
            titre: null,
            content : null,
            error : [],
            isloggedin : false,
            billets : null,
        }
        
    }
    
    componentDidMount(){
        this.fetchblog();
        if(this.state.billets !== null){
            this.setState({titre : this.state.billets.titre, content : this.state.billets.titre});
        }
        // console.log(this.props.match.params.id)
    }

    fetchblog = async () => {
            const form = {
                id : this.props.match.params.id,
            }
            const response = await axios.post( 'http://localhost:4242/billet/info', form, { headers: { 'Content-Type': 'application/json' } } )
            // console.log(response);
            if(response.status == 200){
                const data = response.data;
                this.setState({billets : data.billetinfo});
            } else {
                const error = new Error(response.error);
                throw error;
            }
    }


    deletebillet = async () => {
        const form = {
            id : this.props.match.params.id,
        }
        const response = await axios.post( 'http://localhost:4242/billet/delete', form, { headers: { 'Content-Type': 'application/json' } } )
        console.log(response);
        if(response.status == 200){
            this.props.history.push('/myblog');
        } else {
            const error = new Error(response.error);
            throw error;
        }
    }

    handleInputChange = e => {
        this.setState({
          [e.target.name]: e.target.value,
        });
     //    console.log(this.state);
    };

    changeinfo = async () => {
        if(this.state.email != null && this.state.login != null){
            const form = {
                id : this.state.billets.id,
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

    render(){
        if(this.state.isloggedin){
            this.props.history.push('/profile');
        }
        return (
        <div>
            <h1>Billetinfo CONTROLLER</h1>

            { this.state.billets != null ?  <input name="titre" defaultValue={this.state.billets.titre}></input> : <h1> Vous n'avez aucun billet</h1>}<br></br>
            { this.state.billets != null ?  <textarea name="content" defaultValue={this.state.billets.content}></textarea> : null}<br></br>
            { this.state.billets != null ? <button onClick={this.changeinfo}>CHANGER LE BILLET</button> : null} 
            { this.state.billets != null ? <button onClick={this.deletebillet}>SUPPRIMER LE BILLET</button> : null }
        </div>
        )
    }
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
export default Billetinfo;