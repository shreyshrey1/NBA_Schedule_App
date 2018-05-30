import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchGames } from "../actions/index";
import { bindActionCreators } from 'redux';
import { dateToString, teamsToString } from '../utils/date';
import Game from './Game'

const mapStateToProps = state => ({
    teams: state.teams,
    games: state.games,
    loading: state.loading,
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
    <h1>My Games</h1>
    const { teams, games, loading, error } = this.props;
    
    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <ul>
        {games.map(game =>
          <div>
            <Game date={game.date} home={game.homeTeam.Name} away={game.awayTeam.Name} location={game.location}/>
            <br/>
          </div>
        )}
      </ul>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyGames);