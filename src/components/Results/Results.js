import { useState, useEffect } from "react";
import "./Results.css";
import Workout from "../Workout/Workout";
import BackButton from "../BackButton/BackButton";
import { useParams }from "react-router-dom";
import Navigation from "../Navigation/Navigation";

let workoutComponent = [];

export default function Results(){

    const params = useParams();

    const input = params.input;
    const queryParams = new URLSearchParams(window.location.search);
    const type = queryParams.get("type");
    const muscle = queryParams.get("muscle");
    const difficulty = queryParams.get("difficulty");
    
    const [results, setResults]  = useState({});
    const [noResults, setNoResults] = useState(false);

    const displayWorkouts = () => {
        const data = results;

        //check if there are no results 
        if(data.length === 0){
            setNoResults(true);
        }else{
            for(let i = 0; i < data.length; i++){
                workoutComponent.push(<Workout workoutInfo={data[i]} key={data[i].name}></Workout>);
            }
        }
    }

    /***
     *Filter workouts based on what inputs are empty
     */
    const filterDataUsingInput = (data) => {

        if(!(input === undefined)){
            let filteredData = [];
            for(let i = 0; i < data.length; i++){
                let info = {
                    id : data[i]._id,
                    type : data[i].type,
                    muscle : data[i].muscle,
                    diff : data[i].difficulty,
                    equipment : data[i].equipment,
                }
                
                if((info.id.includes(input) || info.type.includes(input) || info.muscle.includes(input)
                 || info.diff.includes(input) || info.equipment.includes(input))){
                    filteredData.push(data[i]);
                 }
            }
           setResults(filteredData);
        }else{
            setResults(data);
        }

    }

    const fetchAPIData = () => {
        let api = "";

        /**
         *Break down the possible cases for inputs
         */
         //ALL DROPDOWNS are full 
        if(!(type === "type") && !(muscle === "muscle") && !(difficulty === "difficulty")){
            api = (`/workout-webapp/search/all?type=${type}&muscle=${muscle}&difficulty=${difficulty}`);
        //ALL DROPDOWNs are empty
        }else if((type === "type") && (muscle === "muscle") && (difficulty === "difficulty")){
            api = (`/workout-webapp/workouts`);
        //TYPE and MUSC are full 
        }else if(!(type === "type") && !(muscle === "muscle") && (difficulty === "difficulty")){
            api = (`/workout-webapp/search/typeandmuscle?type=${type}&muscle=${muscle}`);
        //TYPE and DIFF are full 
        }else if(!(type === "type") && (muscle === "muscle") && !(difficulty === "difficulty")){
            api = (`/workout-webapp/search/typeanddifficulty?type=${type}&difficulty=${difficulty}`);
        //MUSC and DIFF are full
        }else if((type === "type") && !(muscle === "muscle") && !(difficulty === "difficulty")){
            api = (`/workout-webapp/search/muscleanddifficulty?muscle=${muscle}&difficulty=${difficulty}`)
        //MUSC is full 
        }else if((type === "type") && !(muscle === "muscle") && (difficulty === "difficulty")){
            api = (`/workout-webapp/search/muscle/${muscle}`);
        //TYPE is full
        }else if(!(type === "type") && (muscle === "muscle") && (difficulty === "difficulty")){
            api = (`/workout-webapp/search/type/${type}`);
        //DIFF is full
        }else if((type === "type") && (muscle === "muscle") && !(difficulty === "difficulty")){
            api = (`/workout-webapp/search/difficulty/${difficulty}`);
        }

        fetch(api)
        .then(response => response.json())
        .then(data => filterDataUsingInput(data)) 
    }

    useEffect(() => {
        fetchAPIData()
    }, [])

    useEffect(() => {
        displayWorkouts()
    }, [results])


    return(
        (noResults) ?
        (<div className="resultPage">
            <Navigation/>
            <div>
                <div className="navigation">
                    <BackButton />
                </div>
                <div className="noResults">No results</div>
            </div>
            </div>) :
        (<div className="resultPage">
            <Navigation/>    
            <div>
                <div className="navigation">
                    <BackButton/>
                </div>
                <div className="results">
                    {workoutComponent}
                </div>
            </div>  
        </div>)
    )
}
    

   
    