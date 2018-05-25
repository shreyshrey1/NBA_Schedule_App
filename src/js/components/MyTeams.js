import React, { Component } from "react";
import { connect } from "react-redux";
import { addTeam, deleteTeam } from "../actions/index";
import Team from "./Team"

const mapStateToProps = state => {
    return { teams: state.teams };
  };

const ConnectedMyTeams = ({ teams }) => (
    <ul className="list-group list-group-flush">
        <h1>My Teams</h1>
        {teams.length > 0 ? teams.map(team => (
            <Team add="clear" team={team} />
        )): <h1>No Team Selected </h1>}
    </ul>
);

const MyTeams = connect(mapStateToProps)(ConnectedMyTeams);

export default MyTeams