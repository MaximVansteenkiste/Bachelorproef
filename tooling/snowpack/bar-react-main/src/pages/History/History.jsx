import { useState } from "react";
import BackHeader from "../../components/BackHeader";
import Day from "./partials/Day";
import Month from "./partials/Month";
import { CgCalendarDates, CgCalendarToday } from "react-icons/cg";
import Button from "../../components/Button";
import React from 'react';
const History = () => {
  const [selectedView, setSelectedView] = useState(true);

  return (
    <>
      <BackHeader title="Mijn uitgaven">
        <Button onClick={() => setSelectedView((prev) => !prev)}>
          {selectedView ? <CgCalendarDates /> : <CgCalendarToday />}
        </Button>
      </BackHeader>
      {selectedView ? <Day /> : <Month />}
    </>
  );
};

export default History;
