import Card from "../../../components/Card";
import { number, sugar } from "../../../App";
import Fade from "react-reveal/Fade";
import useTransactions from "../../../hooks/api/useTransactions";
import { useState } from "react";
import React from 'react';
const Day = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().format("%F"));
  const { data, error, isLoading } = useTransactions({
    key: `${selectedDate}Transactions`,
    startDate: new Date(selectedDate),
    endDate: new Date(selectedDate).addDays(1),
  });

  return (
    <div>
      <div className="flex justify-center space-x-2">
        <input
          type="date"
          onChange={(e) => setSelectedDate(e.target.value)}
          value={selectedDate}
          className="dateInput"
          pattern="\d{4}-\d{2}-\d{2}"
          max={new Date().format("%F")}
        />
        <div className="text-title font-bold">€ {number(data?.sum)}</div>
      </div>
      <div className="flex flex-col space-y-2 mt-4 pb-4">
        {data?.transactions?.map((t) => (
          <Fade cascade duration={300} key={t.id}>
            <Card>
              <div className="flex justify-between">
                <div className="">
                  {sugar.Date.create(t.date.toDate()).format("%R")}
                </div>
                <div className="font-bold">€ {number(t.amount)}</div>
              </div>
            </Card>
          </Fade>
        ))}
        {data?.transactions?.length === 0 && (
          <div className="flex justify-center font-xs opacity-70 mt-3">
            Geen transacties
          </div>
        )}
      </div>
    </div>
  );
};

export default Day;
