import {Component} from "react";
import { withRouter } from "react-router-dom";
import "./Details.css"

class Details extends Component{

    constructor(){
        super();
        this.state ={
            workoutInfo: {},
            buttonText: ""
        }
        this._onClickReturnToResults = this._onClickReturnToResults.bind(this);
        this._updateFavorite = this._updateFavorite.bind(this);
    }

    _onClickReturnToResults(){
        window.history.go(-1);
    }

    _updateFavorite(){
        if(this.state.workoutInfo.favorite){
            this.setState({
                buttonText: "unfavorite"
            })
        }else{
            this.setState({
                buttonText: "favorite"
            })
        }
        fetch(`http://localhost:5000/workout-webapp/updatefavorite/${this.state.workoutInfo._id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                favorite: !this.state.workoutInfo.favorite
            })
        });
    }

    render(){
        const name = this.props.match.params.details;
        const url = `http://localhost:5000/workout-webapp/workout/${name}`;

        fetch(url)
        .then(response => response.json())
        .then(data =>{
            if(data[0].favorite){
                this.setState({
                    workoutInfo: data[0],
                    buttonText: "unfavorite"
                })
            }else{
                this.setState({
                    workoutInfo: data[0],
                    buttonText: "favorite"
                })
            }
        })   

        return(<div className="detailsPage">
              <div className="header">
                    <div className="logo">
                        Workout World
                        <p>Where movement means more.</p>
                    </div>
                </div>    
                <div className="detailsSection">
                    <div className="navigation">
                            <button className="returnButton" onClick={this._onClickReturnToResults}>Return to results</button>
                    </div>

                    <div className="details">
                        <div className="workoutName">{this.state.workoutInfo.name}</div>
                        <img className="detailsImage" alt="detailsImage" src={this.state.workoutInfo.image}/>
                        <button className="favoriteButton" onClick={this._updateFavorite}>{this.state.buttonText}</button>
                        <div className="difficulty">Difficulty level: {this.state.workoutInfo.difficulty}</div>
                        <div className="additonalDetails">
                            <div className="muscle">Muscle: {this.state.workoutInfo.muscle}</div>
                            <div className="equipment">Equipment: {this.state.workoutInfo.equipment}</div>
                            <div className="type">Type: {this.state.workoutInfo.type}</div>
                        </div>
                        <div className="instructions">INSTRUCTIONS: {this.state.workoutInfo.instructions}</div>
                    </div>
                </div>
            </div>)
    }
}

 export default withRouter(Details);