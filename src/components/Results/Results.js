import {Component} from "react";
import "./Results.css";
import {withRouter} from "react-router";
import Workout from "../Workout/Workout";

let workoutComponent = [];

class Results extends Component{
    
    constructor(){
        super();
        this.state={
            workouts: {},
            input: "",
            type: "",
            muscle: "",
            difficulty : "",
            noResults: false
        }
        this._displayWorkouts = this._displayWorkouts.bind(this);
        this._onClickReturn = this._onClickReturn.bind(this);
        this._filterWorkoutsbyName = this._filterWorkoutsbyName.bind(this);
        this._fetchData = this._fetchData.bind(this);
    }    

    _onClickReturn(){
        window.location.href = `/workout-webapp`;
    }

    _displayWorkouts(){
        const data = this.state.workouts;
        console.log(data);

        //check if there are no results 
        if(data.length === 0){
            this.setState({
                noResults: true
            });
        }else{
            for(let i = 0; i < data.length; i++){
                workoutComponent.push(<Workout workoutInfo={data[i]} key={data[i].name}></Workout>);
            }
        }
    }

    /***
     *Filter workouts based on what inputs are empty
     */
    _filterWorkoutsbyName(){
        console.log(this.state.workouts);
        if(!(this.state.input === undefined)){
            //console.log("search is full");
            let filteredData = [];
            for(let i = 0; i < this.state.workouts.length; i++){
                let id = this.state.workouts[i]._id;
                let type = this.state.workouts[i].type;
                let muscle = this.state.workouts[i].muscle;
                let diff = this.state.workouts[i].difficulty;
                let equipment = this.state.workouts[i].equipment;
                if((id.includes(this.state.input) || type.includes(this.state.input) || muscle.includes(this.state.input)
                 || diff.includes(this.state.input) || equipment.includes(this.state.input))){
                    filteredData.push(this.state.workouts[i]);
                }
            }
            this.setState({
                workouts: filteredData
            }, () => {
                //console.log(this.state.workouts);
                this._displayWorkouts();
            })
        }else{
            //console.log("search is empty");
            this._displayWorkouts();
        }
    }

    _fetchData(){
        //create a url to assign 
        let url = "";

        /**
         *Break down the possible cases for inputs
         */
         //ALL DROPDOWNS are full 
        if(!(this.state.type==="Type") && !(this.state.muscle === "Muscle") && !(this.state.difficulty === "Difficulty")){
            //console.log("all dd are full");
            url = (`/workout-webapp/search/all?type=${this.state.type}&muscle=${this.state.muscle}&difficulty=${this.state.difficulty}`);
        //ALL DROPDOWNs are empty
        }else if((this.state.type==="Type") && (this.state.muscle === "Muscle") && (this.state.difficulty === "Difficulty")){
            //console.log("all dd are empty");
            url = (`/workout-webapp/workouts`);
        //TYPE and MUSC are full 
        }else if(!(this.state.type==="Type") && !(this.state.muscle === "Muscle") && (this.state.difficulty === "Difficulty")){
            //console.log("type and muscle are full");
            url = (`/workout-webapp/search/typeandmuscle?type=${this.state.type}&muscle=${this.state.muscle}`);
        //TYPE and DIFF are full 
        }else if(!(this.state.type==="Type") && (this.state.muscle === "Muscle") && !(this.state.difficulty === "Difficulty")){
            //console.log("type and diff are full");
            url = (`/workout-webapp/search/typeanddifficulty?type=${this.state.type}&difficulty=${this.state.difficulty}`);
        //MUSC and DIFF are full
        }else if((this.state.type==="Type") && !(this.state.muscle === "Muscle") && !(this.state.difficulty === "Difficulty")){
            //console.log("muscle and diff are full");
            url = (`/workout-webapp/search/muscleanddifficulty?muscle=${this.state.muscle}&difficulty=${this.state.difficulty}`)
        //MUSC is full 
        }else if((this.state.type==="Type") && !(this.state.muscle === "Muscle") && (this.state.difficulty === "Difficulty")){
            //console.log("muscle is full");
            url = (`/workout-webapp/search/muscle/${this.state.muscle}`);
        //TYPE is full
        }else if(!(this.state.type==="Type") && (this.state.muscle === "Muscle") && (this.state.difficulty === "Difficulty")){
            //console.log("type is full");
            url = (`/workout-webapp/search/type/${this.state.type}`);
        //DIFF is full
        }else if((this.state.type==="Type") && (this.state.muscle === "Muscle") && !(this.state.difficulty === "Difficulty")){
            //console.log("diff is full");
            url = (`/workout-webapp/search/difficulty/${this.state.difficulty}`);
        }
        /**
         * fetch the data using the corresponding url
         */
        fetch(url)
        .then(response => response.json())
        .then(data =>{
            this.setState({
                workouts: data
            }, () => {
                this._filterWorkoutsbyName();
            })
        })
    }

    componentDidMount(){
        const input = this.props.match.params.input;
        const queryParams = new URLSearchParams(window.location.search);
        const type = queryParams.get("type");
        const muscle = queryParams.get("muscle");
        const difficulty = queryParams.get("difficulty");

        this.setState({
            input : input,
            type : type,
            muscle : muscle,
            difficulty : difficulty
        }, () =>{
           this._fetchData();
        })
    }

    render(){
        return(
            (this.state.noResults) ?
            (<div>
                <div className="resultHeader">
                    <div className="header">
                        <div className="logo">
                            Workout World
                            <p>Where movement means more.</p>
                        </div>
                    </div>
                </div>
                <div className="resultPage">
                    <div className="navigation">
                        <button className ="returnButton" onClick={this._onClickReturn}>Return to search</button>
                    </div>
                    <div className="noResults">no results</div>
                </div>
                </div>) :
            (<div>
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
                    <div className="results">
                        {workoutComponent}
                    </div>
                </div>  
            </div>)
        )
    }

}

export default withRouter(Results);