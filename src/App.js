import React from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import './App.css';
import Recipes from './Components/Recipes';
import MyRecipes from './Components/MyRecipes';
import HomePage from './Components/HomePage';
import BootNav from './Components/BootNav';
function App() {
  let userName = "alan"
  return (
    <Router>
      <div className="App">

        <BootNav />

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/onlinerecipes" component={Recipes} />
          <Route path="/myrecipes" component={MyRecipes} />
        </Switch>

      </div>
    </Router>
  );
}

export default App;
