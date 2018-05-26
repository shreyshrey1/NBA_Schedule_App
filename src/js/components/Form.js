// src/js/components/Form.js
import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { addTeam, deleteTeam } from "../actions/index";
import { teams } from "../utils/teams";
import Team from "../components/Team";
import styled from "styled-components";

const Wrapper = styled.section`
  height: 400px;
  width: 310px;
  postion: absolute:
  top: 200px;
  overflow: scroll;
`;

const Form1 = styled.section`
  position: absolute;
  top: 175px;
  left: 1%;
`;

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
          <Form1>
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
          </Form1>
        </form>
        <Wrapper>
        {teams.map( (team, i) => {
          return team.teamName.toLowerCase().includes(this.state.team.toLowerCase())
            ?(<Team add="add" team={team} />)
            : null
          }
        )}
        </Wrapper>
      </div>
    );
  }
}
const Form = connect(null, mapDispatchToProps)(ConnectedForm);

export default Form;