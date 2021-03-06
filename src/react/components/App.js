import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './Home'
import Creation from './Creation'

const App = () => {
  return ( 
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/creation" component={Creation} />
      </div>
    </Router>
  )
}

export default App; 

