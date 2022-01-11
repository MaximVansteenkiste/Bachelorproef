import Card from "../../../components/Card";
import { number, sugar } from "../../../App";
import Fade from "react-reveal/Fade";
import { useMemo, useState } from "react";
import useMonthHistory from "../../../hooks/api/useMonthHistory";
import useYearHistory from "../../../hooks/api/useYearHistory";
import React from 'react';
const monthName = (monthNumber) => {
  // eslint-disable-next-line default-case
  switch (Number(monthNumber)) {
    case 1:
      return "Januari";
    case 2:
      return "Februari";
    case 3:
      return "Maart";
    case 4:
      return "April";
    case 5:
      return "Mei";
    case 6:
      return "Juni";
    case 7:
      return "Juli";
    case 8:
      return "Augustus";
    case 9:
      return "September";
    case 10:
      return "Oktober";
    case 11:
      return "November";
    case 12:
      return "December";
  }
};

const Month = () => {
  const [yearInputValue, setYearInputValue] = useState(
    `${new Date().getFullYear()}`
  );
  const { data: years } = useYearHistory();
  const { data: months } = useMonthHistory({ year: yearInputValue });
  const selectedYear = useMemo(
    () => ({
      ...years?.find((y) => y.id === yearInputValue),
      months,
    }),
    [months, yearInputValue, years]
  );

  return (
    <div>
      <div className="flex justify-center space-x-2">
        <select
          name="years"
          id="years"
          className="yearInput"
          onChange={(e) => setYearInputValue(e.target.value)}
        >
          {years?.map((y) => (
            <option value={y.id} selected={y.id === yearInputValue}>
              {y.id}
            </option>
          ))}
        </select>
        <div className="text-title font-bold">
          € {number(selectedYear?.spent)}
        </div>
      </div>
      <div className="flex flex-col space-y-2 mt-4 overflow-y-scroll">
        {selectedYear?.months?.map((m) => (
          <Fade cascade duration={300} key={`${selectedYear.id}/${m.id}`}>
            <Card>
              <div className="flex justify-between">
                <div className="">{monthName(m.id)}</div>
                <div className="font-bold">€ {number(m.spent)}</div>
              </div>
            </Card>
          </Fade>
        ))}
        {selectedYear?.months?.length === 0 && (
          <div className="flex justify-center font-xs opacity-70 mt-3">
            Nog geen uitgaven dit jaar
          </div>
        )}
      </div>
    </div>
  );
};

export default Month;
