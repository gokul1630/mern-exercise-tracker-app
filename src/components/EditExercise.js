import axios from 'axios';
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import constants from '../constants';

class EditExercise extends Component {
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
      .get(constants.URL + `exercises/${this.props.match.params.id}`)
      .then((res) => {
        this.setState({
          user: res.data.user,
          description: res.data.description,
          duration: res.data.duration,
          date: new Date(res.data.date),
        });
      })
      .catch((err) => console.log(err));
    axios
      .get(constants.URL + `users`)
      .then((res) => {
        if (res.data.length > 0) {
          this.setState({ users: res.data.map((res) => res.user) });
        }
      })
      .catch((err) => console.log(err));
  }
  onOptionchange = (e) => {
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
      .patch(constants.URL + `exercises/${this.props.match.params.id}`, exercise)
      .then(() => console.log('exercise updated'))
      .catch((err) => console.log(err));
    this.props.history.push('/');
  }
  render() {
    return (
      <div className='container' style={{ maxWidth: 400 }}>
        <br />
        <div style={{ fontSize: '4vh' }}>Edit Exercise</div>
        <br />
        <form>
          <div className='mb-3'>
            <label htmlFor='user' style={{ fontSize: '3vh' }} className='form-label'>
              User
            </label>
            <select id='user' className='form-control form-select' value={this.state.user} onChange={this.onOptionchange}>
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
            <label htmlFor='description' style={{ fontSize: '3vh' }} className='form-label'>
              Description
            </label>
            <input type='text' className='form-control' id='description' value={this.state.description} onChange={this.onChangeDescription} />
          </div>
          <div className='mb-3'>
            <label htmlFor='duration' style={{ fontSize: '3vh' }} className='form-label'>
              Duration
            </label>
            <input type='number' className='form-control' id='duration' value={this.state.duration} onChange={this.onChangeDuration} />
          </div>
          <div className='mb-3'>
            <label htmlFor='datepicker' style={{ fontSize: '3vh' }} className='form-label'>
              Pick Date
            </label>
            <div style={{ maxWidth: '30%' }}>
              <DatePicker className='form-control' id='datepicker' selected={this.state.date} onChange={this.onDateChange} />
            </div>
          </div>
          <br />
          <button type='submit' onClick={this.onSubmit.bind(this)} className='btn btn-primary'>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default EditExercise;
