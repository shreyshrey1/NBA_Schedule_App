import React, { Component } from "react";
import { connect } from "react-redux";
import { addTeam, deleteTeam } from "../actions/index";

const mapStateToProps = state => {
    return { teams: state.teams };
  };