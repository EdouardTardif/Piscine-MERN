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
                this.setState({titre : this.state.billets.titre, content : this.state.billets.titre});

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
            const form = {
                id : this.state.billets._id,
                titre : this.state.titre,
                content : this.state.content,
            }
            const response = await axios.post( 'http://localhost:4242/billet/update', form, { headers: { 'Content-Type': 'application/json' } } )
            if(response.status == 200){
                const data = response.data;
                window.location.reload(false);


            } else {
                const error = new Error(response.error);
                throw error;
            }
           
            console.log(response.data);
    }

    render(){
        if(this.state.isloggedin){
            this.props.history.push('/profile');
        }
        return (
        <div>
            <h1>Billetinfo CONTROLLER</h1>

            { this.state.billets != null ?  <input onChange={this.handleInputChange} name="titre" defaultValue={this.state.billets.titre}></input> : <h1> Vous n'avez aucun billet</h1>}<br></br>
            { this.state.billets != null ?  <textarea onChange={this.handleInputChange} name="content" defaultValue={this.state.billets.content}></textarea> : null}<br></br>
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