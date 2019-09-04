class Board {
  static genrate(options = {}) {
    let { size = 9 } = options;
    const width = size;
    const height = size;
    const board = [];
    let position = 0;
    let blackSquare = false;

    for (let y = height; y >= 0; y--) {
      let row = [];
      board.push(row);
      for (let x = 0; x < width; x++) {
        row.push({
          x,
          y,
          occupied: null,
          position,
          color: blackSquare ? "steelblue" : "silver"
        });
        blackSquare = !blackSquare;
        position++;
      }
    }

    return board;
  }

  static player(options = {}) {
    let { name = "player", color = "gold" } = options;
    return { name, color, position: 0 };
  }

  static ladders(options = {}) {
    let { number = 5 } = options;
    const ladders = [];
    for (let i = 0; i < number; i++) {
      let start = Math.ceil(Math.random() * 60);
      let end = Math.ceil(Math.random() * (81 - start)) + start;

      ladders.push({
        start,
        end
      });
    }
    return ladders;
  }
  
  static snakes(options = {}) {
    let { number = 5 } = options;
    const snakes = [];
    for (let i = 0; i < number; i++) {
      let start = Math.ceil(Math.random() * 60);
      let end = Math.ceil(Math.random() * (81 - start)) + start;

      snakes.push({
        start,
        end
      });
    }
    return snakes;
  }
}

export default Board;
