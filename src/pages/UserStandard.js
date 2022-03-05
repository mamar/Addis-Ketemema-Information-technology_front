import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

export class UserStandard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employeedata: [],
      startdate: '',

      enddate: ''
    };
  }

  // eslint-disable-next-line react/sort-comp
  Changedate = (e) => {
    this.setState({
      startdate: e
    });
  };

  enddate = (e) => {
    this.setState({
      enddate: e
    });
  };

  componentDidMount() {
    axios.get('http://localhost:1141/Api/Searchdata/showdata').then((response) => {
      console.log(response.data);

      this.setState({
        employeedata: response.data
      });
    });
  }

  onsubmit = (e) => {
    // eslint-disable-next-line no-debugger
    debugger;

    const data = { startdate: this.state.startdate, enddate: this.state.enddate };

    e.preventDefault();

    axios.post('http://localhost:1141/Api/Searchdata/search', data).then((response) => {
      console.log(response.data);

      this.setState({
        employeedata: response.data
      });
    });
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-12 btn btn-info">
            How to Search Data Between Two Dates Using Web API and ReactJS
          </div>
        </div>

        <form onSubmit={this.onsubmit}>
          <div className="row hdr">
            <div className="col-sm-3 form-group"> </div>

            <div className="col-sm-3 form-group">
              <DatePicker
                className="form-control"
                selected={this.state.startdate}
                placeholderText="Select Date"
                showPopperArrow={false}
                onChange={this.Changedate}
              />
            </div>

            <div className="col-sm-3 form-group">
              <DatePicker
                className="form-control"
                selected={this.state.enddate}
                placeholderText="Select Date"
                showPopperArrow={false}
                onChange={this.enddate}
              />
            </div>

            <div className="col-sm-3 form-group">
              <button type="submit" className="btn btn-success">
                Search
              </button>
            </div>
          </div>
        </form>

        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Id</th>

              <th scope="col">Name</th>

              <th scope="col">City</th>

              <th scope="col">JoiningDate</th>
            </tr>
          </thead>

          <tbody>
            {this.state.employeedata.map((p, index) => (
              <tr key={index}>
                <th scope="row">{p.Id}</th>

                <td>{p.Name}</td>

                <td>{p.City}</td>

                <td>{p.JoiningDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default UserStandard;
