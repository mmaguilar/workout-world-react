import react, {Component} from "react";
import "./Home.css";
import {withRouter} from "react-router";

class Home extends Component{

    constructor(){
        super();
        this.workoutType = react.createRef();
        this.workoutMuscle = react.createRef();
        this.workoutDifficulty = react.createRef();
        this.inputRef = react.createRef();

        this.state = {
            workouts: {}
        }

        this._dropdownByType = this._dropdownByType.bind(this);
        this._dropdownByMuscle = this._dropdownByMuscle.bind(this);
        this._dropdownByDifficulty = this._dropdownByDifficulty.bind(this);
        this._onClick = this._onClick.bind(this);
        this._onClickFavorites = this._onClickFavorites.bind(this);
    }

    /**
     * When button is clicked, grab input from all dropdown and search bar
     */
    _onClick(){
        const input = this.inputRef.current.value.replace(/ /g, '').toLowerCase();
        const type = this.workoutType.current.value;
        const muscle = this.workoutMuscle.current.value;
        const difficulty = this.workoutDifficulty.current.value;

        window.location.href = `/workout-webapp/results/${input}?type=${type}&muscle=${muscle}&difficulty=${difficulty}`;
    }

   _onClickFavorites(){
       window.location.href = `/workout-webapp/favorites`;
   }

   _onClickAbout(){
        window.location.href = `/workout-webapp/about`;
   }

    /**This function creates the dropdown by types available in the data and displays them in 
     * alphabetical order
     */
    _dropdownByType(){
        let dropdown = document.getElementById("type");
        dropdown.length = 0;

        let defaultOption = document.createElement("option");
        defaultOption.text = "Type";

        dropdown.add(defaultOption);
        dropdown.selectedIndex = 0;

        const data = this.state.workouts;
        //sorts by alphabetical order 
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
    _dropdownByMuscle(){
        let dropdown = document.getElementById("muscle");
        dropdown.length = 0;

        let defaultOption = document.createElement("option");
        defaultOption.text = "Muscle";

        dropdown.add(defaultOption);
        dropdown.selectedIndex = 0;

        const data = this.state.workouts;
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
     _dropdownByDifficulty(){
        let dropdown = document.getElementById("difficulty");
        dropdown.length = 0;

        let defaultOption = document.createElement("option");
        defaultOption.text = "Difficulty";

        dropdown.add(defaultOption);
        dropdown.selectedIndex = 0;

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

    componentDidMount(){
        fetch("/workout-webapp/workouts")
        .then(response => response.json())
        .then(data => {
            this.setState({
                workouts : data
            }, () => {
                this._dropdownByType();
                this._dropdownByMuscle();
                this._dropdownByDifficulty();
            })
        })  
    }

    render(){
        return(
            <div className="home">
                <div className="logo">
                    Workout World
                    <p>Where movement means more.</p>
                </div>
            <div className="background">
            <div className="body">
                    <div className="navigation">
                        <button className="about" onClick={this._onClickAbout}>About</button>
                        <button className="favorites" onClick={this._onClickFavorites}>Favorites</button>
                    </div>
                <div className="searchSection">
                    <h1 className="textDisplay">Find a Workout!</h1>
                    <input type="text" className="searchBar" placeholder="Search..." 
                    ref = {this.inputRef} defaultValue={undefined}></input>         
                    <div className="dropdownSection">           
                        <select className= "dropdown" id="type" ref={this.workoutType}>
                        </select>

                        <select className= "dropdown" id="muscle" ref={this.workoutMuscle}>
                        </select>

                        <select className= "dropdown" id="difficulty" ref={this.workoutDifficulty}>
                        </select>
                    </div>
                    <button className="homeButton" onClick={this._onClick}>Find workout</button>
                </div>
            </div>
            </div> 
            </div>
        )
    }


}

export default withRouter(Home);