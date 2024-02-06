import {Component} from "react";
import { withRouter } from "react-router-dom";
import Workout from "../Workout/Workout";
import "./Favorites";

const favoritesComponent = [];
class Favorites extends Component{

    constructor(){
        super();
        this.state={
            workouts: {},
            noResults: false,
        }

        this._displayFavorites = this._displayFavorites.bind(this);
        this._onClickReturn = this._onClickReturn.bind(this);
    }

    _onClickReturn(){
        window.location.href = `/workout-webapp`;
    }

    _displayFavorites(){
        const data = this.state.workouts;
        console.log(data);
        if(data.length === 0){
            this.setState({
                noResults: true
            }, () =>{
                console.log(this.state.noResults);
            })
        }
        for(let i = 0; i < data.length; i++){
            favoritesComponent.push(<Workout workoutInfo={data[i]} key={data[i].name}></Workout>)
        }
    }

    componentDidMount(){
        const url = "http://localhost:5000/workout-webapp/favorites";
        fetch(url)
        .then(response => response.json())
        .then(data => {
            this.setState({
                workouts: data
            },() =>{
                this._displayFavorites();
            })
        })
    }

    render(){
        return(
            (this.state.noResults) ?  
            (<div className="favoritesPage">
            <div className="header">
                <div className="logo">
                    Workout World
                    <p>Where movement means more.</p>
                </div>
            </div>     
            <div className="resultPage">
                <div className="navigation">
                    <button className="returnButton" onClick={this._onClickReturn}>Return to search</button>   
                </div>
                <div className="favoritesSection">
                    <p className="noFavorites">No favorites</p>
                </div>
            </div>   
            </div>) : 
            (<div className="favoritesPage">
            <div className="header">
                <div className="logo">
                    Workout World
                    <p>Where movement means more.</p>
                </div>
            </div>     
            <div className="resultPage">
                <div className="navigation">
                    <button className="returnButton" onClick={this._onClickReturn}>Return to search</button>   
                </div>
                <div className="favoritesSection">
                    {favoritesComponent}
                </div>
            </div>   
            </div>) 
        )
    }
}

export default withRouter(Favorites);