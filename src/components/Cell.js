import React from "react";

const cell = ({ cell, boardSizeConst }) => {
  return (
    <div
      className="cell"
      style={{
        top: `${cell.y * boardSizeConst}px`,
        left: `${cell.x * boardSizeConst}px`,
        backgroundColor: `${cell.color}`
      }}
    ></div>
  );
};

export default cell;
