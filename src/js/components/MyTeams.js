import React, { Component } from "react";
import { connect } from "react-redux";
import { addTeam, deleteTeam } from "../actions/index";
import Team from "./Team"
import styled from "styled-components";

const MyTeamsStyled = styled.section`
    position: absolute;
    top: 600px;
    left: -30px;
    width: 350px;
`;


const mapStateToProps = state => {
    return { teams: state.teams };
  };

class ConnectedMyTeams extends Component {
    render() {
        return (
            <MyTeamsStyled>
                <ul className="list-group list-group-flush">
                    <h2 className="mdl-card__title-text">My Teams</h2>
                    {this.props.teams.length > 0 ? this.props.teams.map(team => (
                        <Team add="clear" team={team} />
                    )): <div className="mdl-card__supporting-text">No Team Selected </div>}
                </ul>
            </MyTeamsStyled>
        )
    }
};

const MyTeams = connect(mapStateToProps)(ConnectedMyTeams);

export default MyTeams