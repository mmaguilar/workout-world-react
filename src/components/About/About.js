import './About.css';
import Navigation from "../Navigation/Navigation";
import BackButton from '../BackButton/BackButton';

export default function About(){

    return(
        <div className="about">
            <Navigation />
            <div>              
            <div className="aboutPage">
                <div className="navigation">
                    <BackButton/>
                </div>
                <div className="aboutSection">
                    <p className="aboutTitle">Thank you for visiting Workout World!</p>
                    <p className="aboutDescription">Welcome to Workout World! This web app is designed to provide workouts that best fit your fitness needs. We are constantly working to improve our workouts to help you acheive your fitness goals!</p>
                </div>
            </div>
        </div>
        </div>
    )
}

