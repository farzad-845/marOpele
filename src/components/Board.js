import React, { Component } from "react";
import SnakesAndLadders from "./SnakesAndLadders";
import BOARD from "../Services/Board";
import Cell from "./Cell";
import Player from "./Player";

class Board extends Component {
  constructor(props) {
    super(props);
    this.Board = BOARD.genrate({ size: 9 });
    this.players = [
      BOARD.player({ name: "SnappMarket", color: "white" }),
      BOARD.player({ name: "computer" })
    ];
    this.ladders = BOARD.ladders({ number: 5 });
    this.snakes = BOARD.snakes({ number: 4 });
    this.boardSizeConst = 50;
    this.currentPlayerTurn = 0;
    this.dir = 1;
    this.state = {
      isGameInProgress: true,
      player1Position: this.players[0].position,
      player2Position: this.players[1].position
    };
  }

  gameBoard = () => {
    let board = [];
    this.Board.forEach(row => {
      row.forEach(cell => {
        board.push(
          <Cell
            key={cell.position}
            cell={cell}
            boardSizeConst={this.boardSizeConst}
          />
        );
      });
    });
    return board;
  };

  playersGen = () => {
    let players = [];
    this.players.forEach((player, index) => {
      this.Board.forEach(row => {
        row.forEach(cell => {
          if (cell.position === this.state[`player${index + 1}Position`]) {
            players.push(
              <Player
                key={player.name + index}
                player={player}
                cell={cell}
                boardSizeConst={this.boardSizeConst}
              />
            );
          }
        });
      });
    });
    return players;
  };

  retry = evt => {
    evt.preventDefault();
    this.setState({
      isGameInProgress: true,
      player1Position: 0,
      player2Position: 0
    });
  };

  rollDice = evt => {
    evt.preventDefault();
    if (this.state.isGameInProgress === false) {
      return;
    }
    const max = 6;
    const roll = Math.ceil(Math.random() * max);
    console.log("You rolled", roll);
    const currentPlayerPosition = this.state[
      `player${this.currentPlayerTurn + 1}Position`
    ];

    Math.floor(currentPlayerPosition / 9) % 2 === 0
      ? (this.dir = 1)
      : (this.dir = -1);

    let cell = currentPlayerPosition + roll * this.dir;

    if (cell >= (Math.floor(currentPlayerPosition / 9) + 1) * 9) {
      let diff =
        (Math.floor(currentPlayerPosition / 9) + 1) * 9 -
        1 -
        currentPlayerPosition;
      let diffRoll = roll - diff;
      cell = (Math.floor(cell / 9) + 1) * 9 - diffRoll;
      this.setState({
        [`player${this.currentPlayerTurn + 1}Position`]: cell
      });
    } else if (cell < Math.floor(currentPlayerPosition / 9) * 9) {
      let diff =
        roll -
        (currentPlayerPosition - Math.floor(currentPlayerPosition / 9) * 9);
      cell = (Math.floor(currentPlayerPosition / 9) + 1) * 9 - 1 + diff;

      this.setState({
        [`player${this.currentPlayerTurn + 1}Position`]: cell
      });
    } else {
      this.setState({
        [`player${this.currentPlayerTurn + 1}Position`]: cell
      });
    }

    this.ladders.forEach(ladder => {
      if (cell === ladder.start) {
        console.log("You stepped on a ladder!");
        this.setState({
          [`player${this.currentPlayerTurn + 1}Position`]: ladder.end
        });
      }
    });

    this.snakes.forEach(snake => {
      if (cell === snake.end) {
        console.log("You stepped on a snake!");
        this.setState({
          [`player${this.currentPlayerTurn + 1}Position`]: snake.start
        });
      }
    });

    if (this.state[`player${this.currentPlayerTurn + 1}Position`] >= 81) {
      this.setState({
        isGameInProgress: false
      });
      return;
    }

    if (roll !== 6) {
      this.currentPlayerTurn++;
      if (this.currentPlayerTurn >= this.players.length) {
        this.currentPlayerTurn = 0;
      }
    }
  };

  render() {
    let gameBoard = this.gameBoard();
    let players = this.playersGen();

    return (
      <React.Fragment>
        {this.state.isGameInProgress && (
          <React.Fragment>
            <div>
              <button
                onClick={this.rollDice}
                disabled={!this.state.isGameInProgress}
              >
                Roll Dice
              </button>
              <div className="board">
                {gameBoard}
                {players}
              </div>
            </div>
            <SnakesAndLadders
              ladders={this.ladders}
              snakes={this.snakes}
              board={this.Board}
            />

            <div>
              {this.players[this.currentPlayerTurn].name}'s Turn - with{" "}
              {this.players[this.currentPlayerTurn].color} color
            </div>
          </React.Fragment>
        )}
        {!this.state.isGameInProgress && (
          <>
            <div>Winner : {this.players[this.currentPlayerTurn].name}</div>
            <button onClick={this.retry}>Retry</button>
          </>
        )}
      </React.Fragment>
    );
  }
}

export default Board;
