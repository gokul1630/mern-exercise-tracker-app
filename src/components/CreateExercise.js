import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import constants from '../constants';

class CreateExercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get(constants.URL + `users/`)
      .then((res) => {
        if (res.data.length > 0) {
          this.setState({ users: res.data.map((res) => res.user), user: this.state.users[0] });
        }
      })
      .catch((err) => console.log(err));
  }

  onOptionChange = (e) => {
    this.setState({ user: e.target.value });
  };
  onDateChange = (date) => {
    this.setState({ date: date });
  };
  onChangeDescription = (e) => {
    this.setState({ description: e.target.value });
  };
  onChangeDuration = (e) => {
    this.setState({ duration: e.target.value });
  };
  async onSubmit(e) {
    e.preventDefault();
    var exercise = {
      user: this.state.user,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };

    await axios
      .post(constants.URL + 'exercises/', exercise)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    this.props.history.push('/');
  }
  render() {
    return (
      <div className='container' style={{ maxWidth: 400 }}>
        <br />
        <div style={{ fontSize: '4vh' }}>Create New Exercise</div>
        <br />
        <form>
          <div className='mb-3'>
            <label htmlFor='user' style={{ fontSize: '3vh' }} className='form-label'>
              User
            </label>
            <select id='user' className='form-control form-select' value={this.state.user} onChange={this.onOptionChange}>
              {this.state.users.map(function (res) {
                return (
                  <option key={res} value={res}>
                    {res}
                  </option>
                );
              })}
            </select>
          </div>
          <div className='mb-3'>
            <label style={{ fontSize: '3vh' }} htmlFor='description' className='form-label'>
              Description
            </label>
            <input type='text' className='form-control' id='description' value={this.state.description} onChange={this.onChangeDescription} />
          </div>
          <div className='mb-3'>
            <label style={{ fontSize: '3vh' }} htmlFor='duration' className='form-label'>
              Duration
            </label>
            <input type='number' className='form-control' id='duration' value={this.state.duration} onChange={this.onChangeDuration} />
          </div>
          <div className='mb-3'>
            <label style={{ fontSize: '3vh' }} htmlFor='datepicker' className='form-label'>
              Pick Date
            </label>
            <div style={{ maxWidth: '30%' }}>
              <DatePicker className='form-control' id='datepicker' selected={this.state.date} onChange={this.onDateChange} />
            </div>
          </div>
          <br />
          <button type='submit' className='btn btn-primary' onClick={this.onSubmit.bind(this)}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}
export default CreateExercise;
