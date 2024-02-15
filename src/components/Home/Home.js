import { useEffect, createRef, useState } from "react";
import "./Home.css";
import Navigation from "../Navigation/Navigation";


export default function Home(){

    const workoutType = createRef();
    const workoutMuscle = createRef();
    const workoutDifficulty = createRef();
    const inputRef = createRef();

    const [ workouts, setWorkouts ] = useState([]);

    const onClickSearch = () => {
        const input = inputRef.current.value.replace(/ /g, '').toLowerCase();
        const type = workoutType.current.value;
        const muscle = workoutMuscle.current.value;
        const difficulty = workoutDifficulty.current.value;
        
        window.location.href = `/workout-webapp/results/${input}?type=${type}&muscle=${muscle}&difficulty=${difficulty}`;
    }

    const createDefaultDropdownOption = (id) => {
        let dropdown = document.getElementById(id);
         dropdown.length = 0;
 
         let defaultOption = document.createElement("option");
         defaultOption.text = id;
 
         dropdown.add(defaultOption);
         dropdown.selectedIndex = 0;
         return dropdown;
    }


     /**This function creates the dropdown by types available in the data and displays them in 
      * alphabetical order
      */
     const dropdownByType = () => {
         let dropdown = createDefaultDropdownOption("type");
 
         const data = workouts;

         data.sort((a,b) => a.type.localeCompare(b.type));
 
         //array keeps track of type already included in options
         let tracker = [];
         let option;
         for(let i = 0; i < data.length; i++){
             if(!tracker.includes(data[i].type)){
                 tracker.push(data[i].type);
                 option = document.createElement('option');
                 option.text = data[i].type;
                 option.value = data[i].type;
                 dropdown.add(option);
             }
         }
     }
 
     /**This function creates the dropdown by muscle available in the data and displays them in 
      * alphabetical order
      */
     const dropdownByMuscle = () => {
         let dropdown = createDefaultDropdownOption("muscle");
 
         const data = workouts;
         //sorts by alphabetical order 
         data.sort((a,b) => a.muscle.localeCompare(b.muscle));
 
         //array keeps track of muscle already included in options
         let tracker = [];
         let option;
         for(let i = 0; i < data.length; i++){
             if(!tracker.includes(data[i].muscle)){
                 tracker.push(data[i].muscle);
                 option = document.createElement('option');
                 option.text = data[i].muscle;
                 option.value = data[i].muscle;
                 dropdown.add(option);
             }
         }
     }
 
     /**This function creates the dropdown by difficulty (stored in an array) and displays them 
      */
    const dropdownByDifficulty = () => {
         let dropdown = createDefaultDropdownOption("difficulty");
 
         //array stores difficulty options
         const difficulty = ["beginner", "intermediate", "expert"];
         let option;
         for(let i = 0; i < difficulty.length; i++){
                 option = document.createElement('option');
                 option.text = difficulty[i];
                 option.value = difficulty[i];
                 dropdown.add(option);
         }
     }
 
     useEffect(() => {
        fetch("/workout-webapp/workouts")
        .then(response => response.json())
        .then(data => {
            setWorkouts(data);
        })      

     }, []);

     useEffect(() => {
        dropdownByType();
        dropdownByMuscle();
        dropdownByDifficulty();

     }, [workouts])

    return(
        <div className="home">
        <div className="background">
        <div className="body">
            <Navigation />
            <div className="searchSection">
                <h1 className="textDisplay">Find a Workout!</h1>
                <input type="text" className="searchBar" placeholder="Search..." 
                ref = {inputRef} defaultValue={undefined}></input>         
                <div className="dropdownSection">           
                    <select className= "dropdown" id="type" ref={workoutType}>
                    </select>

                    <select className= "dropdown" id="muscle" ref={workoutMuscle}>
                    </select>

                    <select className= "dropdown" id="difficulty" ref={workoutDifficulty}>
                    </select>
                </div>
                <button className="searchButton" onClick={onClickSearch}>Find workout</button>
            </div>
        </div>
        </div> 
        </div>
    )
}