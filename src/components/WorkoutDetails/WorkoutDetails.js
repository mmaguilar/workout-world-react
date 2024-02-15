import { useEffect, useState } from "react";
import "./WorkoutDetails.css"
import { useParams }from "react-router-dom";
import BackButton from "../BackButton/BackButton";
import Navigation from "../Navigation/Navigation";

export default function WorkoutDetails(){
    
    const params = useParams();

    const [ workoutInfo, setWorkoutInfo ] = useState({});
    const [ buttonText, setButtonText ] = useState("");

    function updateFavorite(){
        if(workoutInfo.favorite){
            setButtonText("unfavorite");
        }else{
            setButtonText("favorite");
        }
        fetch(`/workout-webapp/updatefavorite/${workoutInfo._id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                favorite: !workoutInfo.favorite
            })
        });
    }

    useEffect(() => {
        const name = params.details;
        const url = `/workout-webapp/workout/${name}`;

        fetch(url)
        .then(response => response.json())
        .then(data =>{
            if(data[0].favorite){
                setWorkoutInfo(data[0]);
                setButtonText("unfavorite");
            }else{
                setWorkoutInfo(data[0]);
                setButtonText("favorite");
            }
        }, [])
    })
  
    return(<div className="detailsPage">
              <Navigation/>
                <div className="detailsSection">
                    <div className="navigation">
                        <BackButton/>
                    </div>

                    <div className="details">
                        <div className="workoutName">{workoutInfo.name}</div>
                        <img className="detailsImage" alt="detailsImage" src={workoutInfo.image}/>
                            <button className="favoriteButton" onClick={updateFavorite}>{buttonText}</button>
                            <div className="difficulty">Difficulty level: {workoutInfo.difficulty}</div>
                            <div className="additonalDetails">
                                <div className="muscle">Muscle: {workoutInfo.muscle}</div>
                                <div className="equipment">Equipment: {workoutInfo.equipment}</div>
                                <div className="type">Type: {workoutInfo.type}</div>
                        <div className="instructions">INSTRUCTIONS: {workoutInfo.instructions}</div>

                        </div>
                    </div>
                </div>
            </div>)
}
