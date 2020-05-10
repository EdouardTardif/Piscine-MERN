import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import { BrowserRouter as Router, Link, Switch, Route, Redirect,} from 'react-router-dom';



class Allblogs extends React.Component {

    constructor(props){
        super();
    
        this.state = {
            
            error : [],
            isloggedin : false,
            billets : null,
        }
        
    }
    
    componentDidMount(){
        this.fetchallblog();
        
    }

    fetchallblog = async () => {
            const form = {
                creator : this.props.logininfo.id,
            }
            // console.log('test');
            const response = await axios.post( 'http://localhost:4242/allblogs', form, { headers: { 'Content-Type': 'application/json' } } )
            // console.log(response);
            if(response.status == 200){
                const data = response.data;
                console.log(data.allblogs)
                this.setState({billets : data});
                // console.log(this.state.billets.allbillet)
                // for(let x in this.state.billets.allblogs.resultat){
                //     let cur = this.state.billets.allblogs.resultat;
                //     let cur2 = this.state.billets.allblogs.resul
                //     console.log(cur[x], cur2[x][0]);
                // }
            } else {
                const error = new Error(response.error);
                throw error;
            }
    }

    test = () => {
        for(let x in this.state.billets.allblogs.resultat){
            let cur = this.state.billets.allblogs.resultat;
            let cur2 = this.state.billets.allblogs.resul
            console.log(cur[x], cur2[x][0]);
        }
        return <li>test</li>
    }

    render(){
        if(this.state.isloggedin){
            this.props.history.push('/profile');
        }
        return (
        <div>
            <h1>Myblog CONTROLLER</h1>
                <ul>
                        { this.state.billets != null && this.state.billets.allblogs.resultat.length > 0 ? this.test
                        : <li key='test'> Vous n'avez aucun billet</li>}
                </ul>
        </div>
        )
    }
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
export default Allblogs;