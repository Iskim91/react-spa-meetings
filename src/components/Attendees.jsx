import React, { Component } from 'react';
import firebase from '../Firebase';
import AttendeeList from './AttendeeList';
import { FaUndo, FaRandom } from 'react-icons/fa';

class Attendees extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayAttendees: [],
      searchQuery: '',
      allAttendees: [],
    };
  }

  componentDidMount() {
    const ref = firebase
      .database()
      .ref(`meetings/${this.props.userID}/${this.props.meetingID}/attendees`)

    ref.on('value', snapshot => {
      let attendees = snapshot.val();
      let attendeesList = [];
      for (let item in attendees) {
        attendeesList.push({
          attendeeID: item,
          attendeeName: attendees[item].attendeeName,
          attendeeEmail: attendees[item].attendeeEmail,
          star: attendees[item].star,
        });
      };

      this.setState({
        displayAttendees: attendeesList,
        allAttendees: attendeesList
      });
    })

  }

  renderAttendees = (filteredAttendees) => {
    // let newAttendees = [];
    // if (filteredAttendees.length === 0 && this.state.searchQuery === "") {
    //   newAttendees = this.state.displayAttendees;
    // } else {
    //   newAttendees = filteredAttendees;
    // }
    return filteredAttendees.map(attendee => {
      return <AttendeeList
              attendee={attendee}
              key={attendee.attendeeID}
              adminUser={this.props.adminUser}
              meetingID={this.props.meetingID}
              userID={this.props.userID}
              />
    })
  }

  handleChange = (e) => {
    this.setState({ searchQuery: e.target.value })
  }

  resetQuery = () =>{
    this.setState({
      displayAttendees: this.state.allAttendees,
      searchQuery: '',
    })
  }

  randomAttendee = () => {
    const randomAttendee = Math.floor(Math.random() * this.state.allAttendees.length)
    this.resetQuery();
    this.setState({
      displayAttendees: [this.state.allAttendees[randomAttendee]]
    })
  }

  render() {
    const dataFilter = item =>
      item.attendeeName
      .toLowerCase()
      .match(this.state.searchQuery.toLowerCase()) && true;
    const filteredAttendees = this.state.displayAttendees.filter(dataFilter)
    return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h1 className="font-weight-light text-center">
              Attendees
            </h1>
            <div className="card bg-light mb-4">
              <div className="card-body text-center">
                <div className="input-group input-group-lg">
                  <input type="text" name='searchQuery' value={this.state.searchQuery} className='form-control' placeholder='Search Attendees' onChange={this.handleChange} />
                  <div className="input-group-append">
                    <button
                      className="btn btn-sm btn-outline-info"
                      title='Random Attendee'
                      onClick={this.randomAttendee}
                    >
                      <FaRandom />
                    </button>
                    <button
                      className="btn btn-sm btn-outline-info"
                      title='Reset Search'
                      onClick={this.resetQuery}
                    >
                      <FaUndo />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
         <div className="justify-content-center row">
          {this.renderAttendees(filteredAttendees)}
        </div>
      </div>
    );
  }
}

export default Attendees;
