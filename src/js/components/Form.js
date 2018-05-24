// src/js/components/Form.js
import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { addTeam, deleteTeam } from "../actions/index";
import { teams } from "../utils/teams";

const mapDispatchToProps = dispatch => {
  return {
    addTeam: team => dispatch(addTeam(team)),
    deleteTeam: team => dispatch(deleteTeam(team))
  };
};

class ConnectedForm extends Component {
  constructor() {
    super();
    this.state = {
      team: ""
    };
  }
  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const { team } = this.state;
    const id = uuidv1();
    // this.props.addCity({ zipcode, id });
    // this.setState({ title: "" });
  }
  render() {
    const { team } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="team">Add Team</label>
            <input
              type="text"
              className="form-control"
              id="team"
              value={team}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="btn btn-success btn-lg">
            Add
          </button>
        </form>
        {teams.map( (team, i) => {
          return team.teamName.toLowerCase().includes(this.state.team.toLowerCase())
            ?(<li key={i}>{team.teamName}</li>)
            : null
          }
        )}
      </div>
    );
  }
}
const Form = connect(null, mapDispatchToProps)(ConnectedForm);

export default Form;