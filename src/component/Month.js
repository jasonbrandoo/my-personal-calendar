import React, { useState } from 'react';
import monthNames from '../utils/calender';

function Month({ selectMonth, currentMonth, year }) {
  const [open, setOpen] = useState(false);

  function handleClick(index) {
    selectMonth(index);
  }

  function handleOpen() {
    setOpen((prevState) => !prevState);
  }

  function getMonth() {
    const monthArr = [];
    for (let i = 0; i < monthNames.length; i += 1) {
      monthArr.push(
        <button
          key={i}
          className={
            currentMonth === i
              ? 'month__body-row--current-month'
              : 'month__body-row--select-month'
          }
          type="button"
          onClick={() => handleClick(i)}
        >
          {monthNames[i]}
        </button>,
      );
    }

    const rows = [];
    let cells = [];
    monthArr.forEach((month, i) => {
      if (i % 3 !== 0 || i === 0) {
        cells.push(month);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(month);
      }
      if (i === monthArr.length - 1) {
        rows.push(cells);
      }
    });

    const monthList = rows.map((row) => {
      const key = Math.random();
      return (
        <div className="month__body-row" key={key}>
          {row}
        </div>
      );
    });
    return monthList;
  }

  return (
    <div className="month">
      <div className="month__header">
        <button type="button" onClick={handleOpen}>
          {year}
        </button>
      </div>
      <div className={open ? 'month__body--show' : 'month__body--close'}>
        {getMonth()}
      </div>
    </div>
  );
}

export default Month;
