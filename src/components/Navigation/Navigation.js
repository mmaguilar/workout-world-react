import Hamburger from "../Hamburger/Hamburger";
import "./Navigation.css";
import { useState } from "react";
import propTypes from "prop-types";

export default function Navigation(props){

    const [ hamburgerOpen, setHamburgerOpen ] = useState(false);

    const toggleHamburger = () => {
        setHamburgerOpen(!hamburgerOpen);
    }

    const onClickFavorites = () => {
        window.location.href = `/workout-webapp/favorites`;
    }
 
    const onClickAbout = () => {
         window.location.href = `/workout-webapp/about`;
    }

    return(<div className="navigation">
        <div className="mobile">
            <ul>
                <div className="burger-option" onClick={onClickAbout}>About</div>
                <div className="burger-option" onClick={onClickFavorites}>Favorites</div>
            </ul>
            <div className="hamburger menu" onClick={toggleHamburger}>
                <Hamburger/>
            </div>
            <div className="logo">
                <div>Workout World</div>
            </div>

            <style jsx="true">
                {`
                .navigation ul{
                    display: ${hamburgerOpen ? 'inline' : 'none'};
                    position: absolute;
                    background-color: #202020;
                    box-shadow: 1px 1px 2px black;
                    height: 100vh;
                    width: 50vw;
                    margin-top: 0;
                    padding-top: 12%;
                    padding-left: 1%;
                }
                `}
            </style>
        </div>

        <div className="desktop">
            <div className="logo">Workout World</div>
            <div className="menu">
                <div className="about-option" onClick={onClickAbout}>About</div>
                <div className="favorites-option" onClick={onClickFavorites}>Favorites</div>
            </div>
        </div>
    </div>
    
    )
}

Navigation.propTypes = {
    onClickAbout: propTypes.func,
    onClickFavorites: propTypes.func,
}