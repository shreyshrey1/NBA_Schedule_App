import React, { Component } from "react";
import { connect } from "react-redux";
import { addTeam, deleteTeam } from "../actions/index";
import styled from "styled-components";

class Game extends Component {
  render() {
    return (
      <div>
        <div>Date: {this.props.date}</div>
        <div>Home: {this.props.home}</div>
        <div>Away: {this.props.away}</div>
        <div>Location: {this.props.location}</div>
      </div>
    )
  }
}

export default Game