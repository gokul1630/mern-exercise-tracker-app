import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import CreateExercise from './components/CreateExercise';
import CreateUser from './components/CreateUser';
import EditExercise from './components/EditExercise';
import ExerciseList from './components/ExerciseList';
import Navbar from './components/Navbar';
import './styles.css';
class App extends Component {
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div>
          <Navbar />
          <Route exact path='/' component={ExerciseList}></Route>
          <Route path='/createExercise' component={CreateExercise}></Route>
          <Route path='/createUser' component={CreateUser}></Route>
          <Route path='/editExercise/:id' component={EditExercise}></Route>
        </div>
      </Router>
    );
  }
}

export default App;
