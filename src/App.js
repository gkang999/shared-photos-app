import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from './Navigation.js';
import Homepage from './Homepage.js';
import Albums from './Albums.js';
import About from './About.js';

function App() {
  return (
      <div className="App">
        <title>sharedphotos</title>
        <Router>
          <Navigation/>
          <Switch>
            <Route path="/" exact component={() => <Homepage/>}/>
            <Route path="/albums" exact component={() => <Albums/>}/>
            <Route path="/about" exact component={() => <About/>}/>
          </Switch>
        </Router>
      </div>
  );
}

export default App;
