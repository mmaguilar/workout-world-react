import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
  }from "react-router-dom";
import Home from './components/Home/Home';
import Results from './components/Results/Results';
import './assets/fonts/Excluded.ttf';
import Favorites from './components/Favorites/Favorites';
import About from './components/About/About';
import Details from './components/Details/Details';

function App() {
  return(
    <Router>
      {
        <Switch>
          <Route exact path = "/workout-webapp">
              <Home/>
          </Route>
          <Route path = "/workout-webapp/results/:input">
              <Results/>
          </Route>

          <Route path = "/workout-webapp/results">
              <Results/>
          </Route>

          <Route path = "/workout-webapp/favorites">
             <Favorites/>
          </Route>

          <Route path = "/workout-webapp/about">
            <About/>
          </Route>

          <Route path = "/workout-webapp/workoutdetails/:details">
            <Details/>
          </Route>
        </Switch>
      }
    </Router>
  )
}

export default App;
