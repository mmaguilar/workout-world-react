import {Component, useState, useEffect } from "react";
import Workout from "../Workout/Workout";
import "./Favorites";
import Navigation from "../Navigation/Navigation";
import "./Favorites.css";
import BackButton from "../BackButton/BackButton";

const favoritesComponent = [];

export default function Favorites(){

    const [ favoriteWorkouts, setFavoriteWorkouts] = useState({});
    const [ noResults, setNoResults] = useState(false);

    const onClickBack = () => {
        window.location.href = `/workout-webapp`;
    }
    const displayFavorites = () => {
        if(favoriteWorkouts.length === 0){
            setNoResults(true);
        }
        for(let i = 0; i < favoriteWorkouts.length; i++){
            favoritesComponent.push(<Workout workoutInfo={favoriteWorkouts[i]} key={favoriteWorkouts[i].name}></Workout>)
        }
    }

    useEffect(() => {
        fetch("/api/workout-webapp/favorites")
        .then(response => response.json())
        .then(data => {setFavoriteWorkouts(data)})

    },[])

    useEffect(() => {
        displayFavorites()
    }, [favoriteWorkouts]);

    return(
        (noResults) ?  
        (<div className="favoritesPage">
       <Navigation/>
        <div className="resultPage">
            <div className="navigation">
                <BackButton/>
            </div>
            <div className="favoritesSection">
                <p className="noFavorites">No favorites</p>
            </div>
        </div>   
        </div>) : 
        (<div className="favoritesPage">
       <Navigation/>
        <div className="resultPage">
            <div className="navigation">
                <BackButton/>
            </div>
            <div className="favoritesSection">
                {favoritesComponent}
            </div>
        </div>   
        </div>) 
    )
} 