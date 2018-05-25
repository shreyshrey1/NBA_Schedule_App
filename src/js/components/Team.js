import React, { Component } from "react";
import { connect } from "react-redux";
import { addTeam, deleteTeam } from "../actions/index";

const mapDispatchToProps = dispatch => {
    return {
      addTeam: team => dispatch(addTeam(team))
    };
  };

class ConnectedTeam extends Component {
    onClickAddTeam = (e) => {
        this.props.addTeam(this.props.team)
    }
    render () {
        return (
            <div>
                <ul className="demo-list-icon mdl-list">
                    <li className="mdl-list__item">
                        <span className="mdl-list__item-primary-content">
                            <i className="material-icons mdl-list__item-icon">person</i>
                            {this.props.team.teamName}
                        </span>
                    </li>
                </ul>
                <button name={this.props.team.teamId} onClick={this.onClickAddTeam} className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab">
                    <i className="material-icons">add</i>
                </button>
            </div>
        )
    }
}
const Team = connect(null, mapDispatchToProps)(ConnectedTeam);

export default Team;