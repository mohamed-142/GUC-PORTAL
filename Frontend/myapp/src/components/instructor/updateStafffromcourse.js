import React, { Component } from "react";
import axios from "axios";

export default class UpdateStafffromcourse extends Component {
  constructor(props) {
    super(props);

    this.onChangecurrMember = this.onChangecurrMember.bind(this);
    this.onChangenewMember = this.onChangenewMember.bind(this);
    this.onChangeCourse = this.onChangeCourse.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      currentMember: "",
      newMember: "",
      courses: [],
      course: "",
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:1000/instructor/mycourses")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            courses: response.data.map((course) => course),
            course: response.data[0],
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangecurrMember(e) {
    this.setState({
      currentMember: e.target.value,
    });
  }

  onChangenewMember(e) {
    this.setState({
      newMember: e.target.value,
    });
  }

  onChangeCourse(e) {
    this.setState({
      course: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const body = {
      currentMember: this.state.currentMember,
      newMember: this.state.newMember,
      course: this.state.course,
    };

    axios
      .post("http://localhost:1000/instructor/updateStaffFromCourse", body)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });

    this.setState({
      currentMember: "",
      newMember: "",
      course: "",
    });

    alert("Member updated to this course.");
  }

  render() {
    return (
      <div>
        <div
          style={{
            position: "absolute",
            top: "12%",
            width: "55%",
            left: "20%",
          }}
        >
          <form
            style={{
              textAlign: "center",
              position: "relative",
              padding: "10px",
            }}
            className="assignForm"
            onSubmit={this.onSubmit}
          >
            <div className="col-md col-sm-12 form-group">
              <label style={{ fontSize: "20px" }} for="exampleInputEmail1">
                Current Member
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Current member assigned to this slot"
                value={this.state.currentMember}
                onChange={this.onChangecurrMember}
              ></input>
            </div>
            <div className="col-md col-sm-12 form-group">
              <label style={{ fontSize: "20px" }} for="exampleInputEmail2">
                New Member
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail2"
                placeholder="New member you want to assign to this slot"
                value={this.state.newMember}
                onChange={this.onChangenewMember}
              ></input>
            </div>

            <br></br>
            <label style={{ fontSize: "20px" }}>Course</label>
            <select
              required
              className="form-control"
              value={this.state.course}
              onChange={this.onChangeCourse}
            >
              {this.state.courses.map(function (course) {
                return (
                  <option key={course} value={course}>
                    {course}
                  </option>
                );
              })}
            </select>
            <br></br>

            <button
              style={{ marginTop: "10px" }}
              type="submit"
              className="btn btn-dark rounded"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    );
  }
}
