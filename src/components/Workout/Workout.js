import {Component} from "react";
import "./Workout.css";
import { withRouter } from "react-router-dom";

class Workout extends Component{

    constructor(){
        super();
        this._displayWorkout = this._displayWorkout.bind(this);
    }

    _displayWorkout(){
        window.location.href=`/workout-webapp/workoutdetails/${this.props.workoutInfo._id}`;
    }

    render(){
        return(
            <div onClick={this._displayWorkout} className="workout" >
                <div className="detailSection">
                    <h3 className="workoutName">{this.props.workoutInfo.name}</h3>
                    <img className = "workoutImage" alt="workoutImage" src={this.props.workoutInfo.image}></img>
                    <div className="description">
                        <p className="equipmentDetail">Equipment: {this.props.workoutInfo.equipment}</p>
                        <p className="muscleDetail">Muscle: {this.props.workoutInfo.muscle}</p>
                    </div> 
                </div>
                
            </div>
        )
    }
}

export default withRouter(Workout);