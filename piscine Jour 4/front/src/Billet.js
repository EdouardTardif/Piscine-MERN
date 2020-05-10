import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Redirect,} from 'react-router-dom';



class Billet extends React.Component {

    constructor(props){
        super();
    
        this.state = {
            id : null,
            titre : null,
            content : null,
            error : [],
        }
    }
    

    handleInputChange = e => {
        this.setState({
          [e.target.name]: e.target.value,
        });
        // console.log(this.state);
    };


    







    createbillet = async () => {
        const form = {
            id : this.props.logininfo.id,
            titre : this.state.titre,
            content : this.state.content,
        }
        const response = await axios.post( 'http://localhost:4242/billet/create', form, { headers: { 'Content-Type': 'application/json' } } )
        if(response.status == 200){
            console.log(response.status); 
        } else {
            const error = new Error(response.error);
            throw error;
        }
    }

    render(){
        return (
        <div>
            <h1>BILLET CONTROLLER</h1>
                <ul>
                    <li>
                        <label htmlFor="titre">titre</label><br></br>
                        <input onChange={this.handleInputChange} type="text" name="titre" id="titre"></input>
                    </li>
                    <li>
                        <label htmlFor="content">content</label><br></br>
                        <textarea onChange={this.handleInputChange} type="text" name="content" id="content"></textarea>
                        <h3>{this.state.error}</h3>
                    </li>
                </ul>
                <button onClick={this.createbillet} value="S'inscrire">se Connecter</button>
        </div>
        )
    }
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
export default Billet;