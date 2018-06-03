import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchGames } from "../actions/index";
import { bindActionCreators } from 'redux';
import { dateToString, teamsToString } from '../utils/date';
import Game from './Game';
import styled from "styled-components";

const Card = styled.section`
    position: absolute;
    top: 180px;
    left: 650px;
`;


const mapStateToProps = state => ({
    teams: state.teams,
    games: state.games,
    loading: state.gameloading,
    error: state.error
  });

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchGames
    },
    dispatch
  )
};

class MyGames extends React.Component {
  render() {
    const { teams, games, loading, error } = this.props;
    
    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return (
        <Card>
          <div className="mdl-spinner mdl-js-spinner is-active"></div>
        </Card>
      )
    }

    return (
      <Card className="list-group list-group-flush">
        <ul className="list-group list-group-flush">
          <h2 className="mdl-card__title-text">Games This Week</h2>
            {games.length != 0 ?
            games.map(game =>
              <div>
                <Game date={game.date} home={game.homeTeam.Name} away={game.awayTeam.Name} location={game.location}/>
                <br/>
              </div>
            ) :
            <div className="mdl-card__supporting-text">No Games in Coming Week </div>
            }
        </ul>
      </Card>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyGames);