import React, { Component } from 'react';
import firebase from '../Firebase';
import { navigate } from '@reach/router';
import { GoTrashcan, GoListUnordered } from 'react-icons/go';
import { FaLink } from 'react-icons/fa';

class MeetingList extends Component {
  deleteMeeting(e, meetingID) {
    e.preventDefault();
    const ref = firebase
      .database()
      .ref(`meetings/${this.props.userID}/${meetingID}`);
    ref.remove();
  }

  render() {
    return (
      <div>
        <div className="list-group-item d-flex border-top"  >
          <section className="btn-group align-self-center" rol="group" aria-label="Meeting Options">
            <button className="btn btn-small btn-outline-secondary"
              title="Delete Meeting"
              onClick={e => this.deleteMeeting(e, this.props.item.meetingID)}
            >
              <GoTrashcan />
            </button>
            <button className="btn btn-small btn-outline-secondary"
              title="Check In"
              onClick={() => navigate(`/checkin/${this.props.userID}/${this.props.item.meetingID}`)}
            >
              <FaLink />
            </button>
            <button className="btn btn-small btn-outline-secondary"
              title="Attendees List"
              onClick={() => navigate(`/attendees/${this.props.userID}/${this.props.item.meetingID}`)}
            >
              <GoListUnordered />
            </button>
          </section>

          <section className='pl-3 text-left align-self-center'>
            {this.props.item.meetingName}
          </section>
        </div>
      </div>

    );
  }
}

export default MeetingList;
