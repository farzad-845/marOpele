import React, { useRef, useLayoutEffect } from "react";

const drawLine = ({ color, startPos, endPos, context }) => {
  context.beginPath();
  context.moveTo(startPos.x + 25, startPos.y + 25);
  context.lineTo(endPos.x + 25, endPos.y + 25);

  context.lineWidth = 5;
  context.strokeStyle = color;
  context.stroke();

};

const itemGenrator =(options = {})=>{
    const {items,color,board,context} = options;
    const boardSizeConst = 50;

    items.forEach(item => {
      let startPos = { x: 0, y: 0 };
      let endPos = { x: 0, y: 0 };

      board.forEach(row => {
        row.forEach(cell => {
          if (cell.position === item.start) {
            startPos.x = cell.x * boardSizeConst;
            startPos.y = cell.y * boardSizeConst;
          }

          if (cell.position === item.end) {
            endPos.x = cell.x * boardSizeConst;
            endPos.y = cell.y * boardSizeConst;
          }
        });
      });

      drawLine({ color, startPos, endPos, context });
    });
}

const SnakesAndLadders = ({ ladders,snakes, board }) => {
  const canvas = useRef(null);

  useLayoutEffect(() => {
    const context = canvas.current.getContext("2d");

    itemGenrator({items:ladders,color:"green",board,context})
    itemGenrator({items:snakes,color:"red",board,context})

  });

  return <canvas className="canvas" ref={canvas} width="1000" height="1000" />;
};

export default SnakesAndLadders;
