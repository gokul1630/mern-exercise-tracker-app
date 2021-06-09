import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <div>
        <ul style={{ paddingTop: '10px' }} className='nav nav-tabs'>
          <li className='nav-item'>
            <a className='nav-link disabled' tabIndex='-1' href='/' style={{ fontSize: '25px' }}>
              Exercise Tracker
            </a>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/'>
              Exercise List
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/createExercise'>
              Create Exercise
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/createUser'>
              Create User
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Navbar;
