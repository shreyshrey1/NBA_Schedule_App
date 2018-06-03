import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStandings } from "../actions/index";
import { bindActionCreators } from 'redux';
import { dateToString, teamsToString } from '../utils/date';
import Game from './Game';
import Team from "./Team";
import Standing from "./Standing";
import styled from "styled-components";

const Wrapper = styled.section`
  height: 400px;
  width: 310px;
  postion: absolute:
  top: 100px;
  right: 50px;
  overflow: scroll;
`;

const mapStateToProps = state => ({
    teams: state.teams,
    games: state.games,
    loading: state.standingsloading,
    error: state.error,
    standings: state.standings
  });

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchStandings
    },
    dispatch
  )
};

class MyGames extends React.Component {
  componentWillMount() {
    this.props.fetchStandings()
  }
  render() {
    <h1>Standings</h1>
    const { standings, loading, error } = this.props;
    
    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return (
        <Wrapper>
          <div class="mdl-spinner mdl-js-spinner is-active"></div>
        </Wrapper>
    );
    }

    return (
      <div>
      <h2 className="mdl-card__title-text">Standings</h2>
      <Wrapper>
      <ul>
        {standings.map(el =>
          <div>
            <Standing team={el.team}/>
            <br/>
          </div>
        )}
      </ul>
      </Wrapper>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyGames);