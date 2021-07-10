import axios from 'axios';
import React, { Component } from 'react';
import constants from '../constants';
import Exercise from './Exercise';
import Footer from './Footer';

class ExerciseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: [],
    };
    this.deleteExercise = this.deleteExercise.bind(this);
  }
  componentDidMount() {
    axios.get(constants.URL + `exercises`).then((response) => {
      this.setState({ exercises: response.data });
    });
  }
  async deleteExercise(id) {
    await axios
      .delete(constants.URL + `exercises/${id}`)
      .then(() => this.setState({ exercises: this.state.exercises.filter((filterKey) => filterKey._id !== id) }))
      .catch((err) => console.log(err));
  }
  exercises = () => {
    return this.state.exercises.map((exercise) => {
      return <Exercise exercise={exercise} key={exercise._id} delete={this.deleteExercise} />;
    });
  };

  render() {
    return (
      <div className='container'>
        <br />
        <div style={{ fontSize: '4vh' }}>Exercise List</div>
        <br />
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>User</th>
              <th scope='col'>Description</th>
              <th scope='col'>Duration</th>
              <th scope='col'>Date</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>

          <tbody>{this.exercises()}</tbody>
        </table>
        <Footer/>
      </div>
    );
  }
}

export default ExerciseList;
