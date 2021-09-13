import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/authentication/Login';
import Register from './components/authentication/Register';
import Home from './components/routes/Home';
import New from './components/routes/projects/New';
import Projects from './components/routes/projects/Projects';
import { nullPathCheck } from './functions/main';

function App() {

  nullPathCheck();

  return (
    <Router>
      <Switch>
        {/* Authentication */}
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>
        {/* Authentication */}

        {/* Main Routes */}
        <Route path="/home" component={Home}/>
        <Route path="/projects" component={Projects}/>
        <Route path="/u/:uid/projects/new" component={New}/>
        <Route path="/projects/:id" component={New}/>
        {/* Main Routes */}
      </Switch>
    </Router>
  );
}

export default App;