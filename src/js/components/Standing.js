import React, { Component } from "react";

class Standing extends Component {
    render () {
        return (
            <div>
                <ul className="demo-list-icon mdl-list">
                    <li className="mdl-list__item">
                        <span className="mdl-list__item-primary-content">
                            {this.props.team.City + " " + this.props.team.Name}
                        </span>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Standing;