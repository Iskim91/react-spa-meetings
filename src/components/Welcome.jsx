import React, { Component } from 'react';
import {Link} from '@reach/router';

class Welcome extends Component {
  render() {
    const {userName} = this.props;
    return (
      <div className='text-center mt-4'>
        <span className="text-secondary font-weight-bold pl-1 ">
          Welcome {userName}
        </span>
        ,
        <Link to='/login' className="text-primary font-weight-bold pl-1" onClick={this.props.logoutUser}>
          Log out
        </Link>
      </div>
    );
  }
}

export default Welcome;
