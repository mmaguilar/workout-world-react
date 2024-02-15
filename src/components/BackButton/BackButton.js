import "./BackButton.css";

export default function BackButton(){

    const onClick = () => {
        window.history.go(-1);
    }

    return(
        <>
            <button className ="backButton" onClick={onClick} >Back</button>
        </>
    )
}