import React, { Component } from 'react'

export default class Todo extends Component {
  render() {
    return (
      <li
        onClick={this.props.onClick}
        className={this.props.completed?'complete':'default'}>
        {this.props.text}
      </li>
    )
  }
}
