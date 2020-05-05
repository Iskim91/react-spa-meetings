import React, { Component } from 'react';
// import {Link} from '@reach/router';
import { GoTrashcan, GoStar, GoMail } from 'react-icons/go';
import firebase from '../Firebase';

class AttendeeList extends Component {

  deleteAttendee = (e, attendeeID) => {
    e.preventDefault();
    const ref = firebase
      .database()
      .ref(`meetings/${this.props.adminUser}/${this.props.meetingID}/attendees/${attendeeID}`);
      // debugger
    ref.remove();

  }

  toggleStar = (e) => {
    e.preventDefault();
    const ref = firebase
      .database()
      .ref(`meetings/${this.props.adminUser}/${this.props.meetingID}/attendees/${this.props.attendee.attendeeID}/star`)

    if (this.props.attendee.star === undefined) {
      ref.set(true);
    } else {
      ref.set(!this.props.attendee.star);
    }

  }

  render() {
    const admin = this.props.adminUser === this.props.userID ? true : false;
    return (

        <div
          className="col-8 col-sm-6 col-md-4 col-lg-3 mb-2 p-0 px-1">
          <div className="card ">
            <div className={
                "card-body px-3 py-2 d-flex align-items-center " +
                  (admin ? '' : "justify-content-center")
                }
            >
            { admin && (
              <div className="btn-group pr-2">
                <button className={
                  "btn btn-sm " +
                  (this.props.attendee.star ? 'btn-info' : "btn-outline-secondary")
                }
                  title="Give a star"
                  onClick={this.toggleStar}
                >
                  <GoStar />
                </button>
                <a
                  className="btn btn-sm btn-outline-secondary"
                  title="Mail Attendee"
                  href={`mailto:${this.props.attendee.attendeeEmail}`}>
                  <GoMail />
                </a>
                <button className="btn btn-sm btn-outline-secondary"
                  title="Delete"
                  onClick={e => this.deleteAttendee(e, this.props.attendee.attendeeID)}
                >
                  <GoTrashcan />
                </button>
              </div>
              )

            }
              <div>{this.props.attendee.attendeeName}</div>

            </div>
          </div>
        </div>
    );
  }
}

export default AttendeeList;
