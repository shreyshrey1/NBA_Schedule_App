// src/js/components/Form.js
import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { addTeam, deleteTeam } from "../actions/index";
import { teams } from "../utils/teams";
import Team from "../components/Team"

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
  render() {
    const { team } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="mdl-textfield mdl-js-textfield">
            <label htmlFor="team" className="mdl-textfield__label">Search Teams</label>
            <input
              type="text"
              className="mdl-textfield__input"
              id="team"
              value={team}
              onChange={this.handleChange}
            />
          </div>
        </form>
        {teams.map( (team, i) => {
          return team.teamName.toLowerCase().includes(this.state.team.toLowerCase())
            ?(<Team add="add" team={team} />)
            : null
          }
        )}
      </div>
    );
  }
}
const Form = connect(null, mapDispatchToProps)(ConnectedForm);

export default Form;