import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { addTeam, deleteTeam, fetchGames } from "../actions/index";
import styled  from "styled-components";
import { dateToString, teamsToString } from "../utils/date";

const ButtonRelative = styled.section`
    position: relative;
`;
const ButtonAbsolute = styled.section`
    position: absolute;
    top: -75px;
    right: 0px;
`;

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
      {
        addTeam,
        deleteTeam,
        fetchGames
      },
      dispatch
    )
  };

const mapStateToProps = state => ({
    teams: state.teams,
    games: state.games,
    loading: state.loading,
    error: state.error
});

class ConnectedTeam extends Component {
    onClickAddTeam = (e) => {
        var today = new Date();
        if (this.props.add == 'add') {
            this.props.addTeam(this.props.team)
            for (var i = 0; i < 7; i++) {
                this.props.fetchGames(dateToString(today), teamsToString(this.props.teams.concat([this.props.team])));
                today.setDate(today.getDate() + 1);
            }
        }
        else {
            this.props.deleteTeam(this.props.team)
            let new_teams = this.props.teams.filter(el => el.teamId != this.props.team.teamId)
            for (var i = 0; i < 7; i++) {
                this.props.fetchGames(dateToString(today), teamsToString(new_teams));
                today.setDate(today.getDate() + 1);
            }
        }
    }
    render () {
        return (
            <div>
                <ul className="demo-list-icon mdl-list">
                    <li className="mdl-list__item">
                        <span className="mdl-list__item-primary-content">
                            <img src={this.props.team.imgLink} width="50" height="33"/>
                            {this.props.team.teamName}
                        </span>
                    </li>
                </ul>
                <ButtonRelative>
                    <ButtonAbsolute>
                        <button name={this.props.team.teamId} onClick={this.onClickAddTeam} className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
                            <i className="material-icons">{this.props.add}</i>
                        </button>
                    </ButtonAbsolute>
                </ButtonRelative>
            </div>
        )
    }
}
const Team = connect(mapStateToProps, mapDispatchToProps)(ConnectedTeam);

export default Team;