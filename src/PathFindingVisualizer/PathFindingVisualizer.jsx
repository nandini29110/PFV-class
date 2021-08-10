import React, { Component } from "react";
import Node from "./Node/Node";
import { dijkstra, getNodesInShortestPathOrder } from "../Algorithms/dijkstra";
import "./PathFindingVisualizer.css";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class PathFindingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  // const getInitialGrid = () => {
  // setTimeout(() => {
  //   const node = visitedNodesInOrder[i];
  //   const newGrid = this.state.grid.slice();
  //   const newNode = {
  //     ...node,
  //     isVisited: true,
  //   };

  //   newGrid[node.row][node.col] = newNode;
  //   this.setState({ grid: newGrid });
  // }, 1000 * (k + 1));

  //   var i=1;
  // function change(){
  //     return new Promise(function(resolve, reject) {

  //         // Setting 2000 ms time
  //         setTimeout(resolve, 5000);
  //     }).then(function() {
  //         if(i<10){
  //             i++;
  //             console.log("HEY");
  //             change();
  //         }
  //     });
  // }
  // change();
  visualizeDijkstra() {
    const { grid } = this.state;
    console.log(grid);
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode); // see again
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode); //see again
    this.animateDijkstra(visitedNodesInOrder, 0, visitedNodesInOrder.length);
  }
  render() {
    const { grid } = this.state;
    console.debug(grid);
    return (
      <>
        <button onClick={() => this.visualizeDijkstra()}>
          Visualize Dijkstra's Algorithm
        </button>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { isStart, isFinish, isVisited } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      isStart={isStart}
                      isFinish={isFinish}
                      isVisited={isVisited}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    row,
    col,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

function animateDijkstra(visitedNodesInOrder, i, n) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, 1000);
  }).then(function () {
    if (i < n) {
      const node = visitedNodesInOrder[i];
      const newGrid = this.state.grid.slice();
      const newNode = {
        ...node,
        isVisited: true,
      };

      newGrid[node.row][node.col] = newNode;
      this.setState({ grid: newGrid });
      animateDijkstra(visitedNodesInOrder, i + 1, n);
    }
  });
}
