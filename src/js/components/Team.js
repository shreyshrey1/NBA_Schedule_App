import React, { Component } from "react";
import { connect } from "react-redux";
import { addTeam, deleteTeam } from "../actions/index";
import styled  from "styled-components"

const ButtonRelative = styled.section`
    position: relative;
`;
const ButtonAbsolute = styled.section`
    position: absolute;
    top: -75px;
    right: 0px;
`;

const mapDispatchToProps = dispatch => {
    return {
      addTeam: team => dispatch(addTeam(team)),
      deleteTeam: team => dispatch(deleteTeam(team))
    };
  };

class ConnectedTeam extends Component {
    onClickAddTeam = (e) => {
        if (this.props.add == 'add') {
            this.props.addTeam(this.props.team)
        }
        else {
            this.props.deleteTeam(this.props.team)
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
const Team = connect(null, mapDispatchToProps)(ConnectedTeam);

export default Team;