import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchGames } from "../actions/index";
import { bindActionCreators } from 'redux';

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
    componentDidMount() {
        var today = new Date();
        for (var i = 0; i < 7; i++) {
            this.props.fetchGames(today, this.props.teams);
            today.setDate(today.getDate() + 1);
        }
    }

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
          <li key={game.id}>{game.scheduleStatus}</li>
        )}
      </ul>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyGames);