import axios from 'axios';
import React, { Component } from 'react';
import constants from '../constants';

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      isValid: true,
    };
  }
  async checkInput(e) {
    e.preventDefault();
    var warnText = document.getElementById('warn');
    warnText.style.color = 'red';
    if (this.state.user === '') {
      this.setState({
        isValid: false,
      });
      warnText.innerHTML = 'User required';
    } else {
      this.setState({
        isValid: true,
      });
      warnText.innerHTML = null;
      await axios
        .post(constants.URL + `users/add`, {
          user: this.state.user,
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
    this.props.history.push('/createExercise');
  }
  changeText = (event) => {
    this.setState({
      user: event.target.value,
    });
  };
  render() {
    return (
      <div className='container' style={{ maxWidth: 400 }}>
        <br />
        <div style={{ fontSize: '4vh' }}>Create New User</div>
        <br />
        <div className='mb-3'>
          <label htmlFor='name' style={{ fontSize: '3vh' }} className='form-label'>
            User
          </label>
          <input
            type='text'
            id='name'
            placeholder='Enter Your Name'
            className={this.state.isValid ? 'form-control' : 'form-control is-invalid'}
            value={this.state.user}
            onChange={this.changeText}
          />
          <p id='warn'></p>
        </div>
        <button type='button' className='btn btn-primary center' onClick={this.checkInput.bind(this)}>
          Submit
        </button>
      </div>
    );
  }
}

export default CreateUser;
