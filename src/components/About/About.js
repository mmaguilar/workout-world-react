import {Component} from "react";
import { withRouter } from "react-router-dom";
import './About.css';

class About extends Component{

    constructor(){
        super();
        this._onClickReturn = this._onClickReturn.bind(this);
    }

    _onClickReturn(){
        window.location.href = `/workout-webapp`;
    }

    render(){
        return(
            <div className="about">
                <div>
                <div className="header">
                    <div className="logo">
                        Workout World
                        <p>Where movement means more.</p>
                    </div>
                </div>                    
                <div className="aboutPage">
                    <div className="navigation">
                        <button className="returnButton" onClick={this._onClickReturn}>Return to search</button>
                    </div>
                    <div className="aboutSection">
                        <p className="aboutTitle">Thank you for visiting Workout World!</p>
                        <img className="aboutImage" alt="AboutImage" src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1200"></img>
                        <p className="aboutDescription">Welcome to Workout World! This web app is designed to provide workouts that best fit your fitness needs. We are constantly working to improve our workouts to help you acheive your fitness goals!</p>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default withRouter(About);