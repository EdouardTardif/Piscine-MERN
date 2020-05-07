import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';



class Test extends React.Component {


    state = {
        users : []
    }



    async POST(genre){
        const form = new FormData()
        form.set( 'genre', genre);
        const response2 = await axios.post(
            'http://localhost/API_spotify/php/api.php',
            form,
            { headers: { 'Content-Type': 'application/json' } }
        )
        this.setState({resgenre : response2.data,boolgenre : false});
    }
    
    
    async fetchusers(){
        const users = await axios.get('http://localhost:4242/users');
        this.setState({users : users.data});
        console.log(this.state);
    }


    render(){
        return (
        <div>
            <h1>TEST class</h1>
            <button onClick={() => {this.fetchusers()}}>LE TEST</button>
        </div>
        )
    }
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
export default Test;