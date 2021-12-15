import { number } from "../../App";
import Card from "../Card";
import { FiMoreVertical } from "react-icons/fi";
import React from 'react';

const SpentCard = ({ spent, date, onClick }) => {
  return (
    <Card>
      <div
        className="grid place-items-center m-3 relative"
        onClick={() => onClick(date)}
      >
        <div className="flex flex-col justify-center content-center text-center">
          <div className="text-3xl font-bold">€ {number(spent)}</div>
          <div className="text-xs opacity-50">{date}</div>
        </div>
        <div className="absolute -top-2 -right-2 opacity-50">
          <FiMoreVertical />
        </div>
      </div>
    </Card>
  );
};

export default SpentCard;
