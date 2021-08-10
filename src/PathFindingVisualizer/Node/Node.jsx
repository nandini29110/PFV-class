import React, { Component } from "react";
import "./Node.css";

export default class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { isStart, isFinish, isVisited } = this.props;
    const extraClassName = isFinish
      ? "node-finish"
      : isStart
      ? "node-start"
      : isVisited
      ? "node-visited"
      : "";
    return (
      <div className={`node ${extraClassName}`}>
        <h1></h1>
      </div>
    );
  }
}

export const DEFAULT_NODE = {
  row: 0,
  col: 0,
};
