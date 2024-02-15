import "./Workout.css";

export default function Workout(props){
        
    const displayWorkout = () => {
        window.location.href=`/workout-webapp/workoutdetails/${props.workoutInfo._id}`;
    }

    return(
    <div onClick={displayWorkout} className="workout" >
    <div className="detailSection">
        <h3 className="workoutName">{props.workoutInfo.name}</h3>
        <div className="description">
            <p className="equipmentDetail">Equipment: {props.workoutInfo.equipment}</p>
            <p className="muscleDetail">Muscle: {props.workoutInfo.muscle}</p>
        </div> 
    </div>
    </div>)
}
