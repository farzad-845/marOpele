import React from "react";

const player = ({ player, cell, boardSizeConst }) => {
  return (
    <div
      className="player"
      style={{
        top: `${cell.y * boardSizeConst + 5}px`,
        left: `${cell.x * boardSizeConst + 5}px`,
        backgroundColor: `${player.color}`
      }}
    ></div>
  );
};

export default player;
