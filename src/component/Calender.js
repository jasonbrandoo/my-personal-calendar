import React, { useState, useEffect } from 'react';
import Month from './Month';
import Modal from './Modal';

function Calender() {
  const today = new Date();
  const currentDay = today.getDate();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [dmy, setDMY] = useState({});
  const [localState, setLocalState] = useState(
    JSON.parse(localStorage.getItem('My-Events')) || [],
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('My-Events', JSON.stringify(localState));
  }, [localState]);

  function selectMonth(index) {
    setCurrentMonth(index === 11 ? index + 1 : index);
  }

  function addEvent(text, d, m, y) {
    const newDate = new Date(y, m, d);
    const newEvent = {
      note: text,
      date: newDate,
    };
    setLocalState((prevState) => [...prevState, newEvent]);
  }

  function openModal(d, m, y) {
    setOpen((prevState) => !prevState);
    setDMY({
      date: d,
      month: m,
      year: y,
    });
  }

  // var getDaysInMonth = function(month,year) {
  // Here January is 1 based
  // Day 0 is the last day in the previous month
  // return new Date(year, month, 0).getDate();
  // Here January is 0 based
  // return new Date(year, month+1, 0).getDate();
  // };
  // console.log(getDaysInMonth(1, 2012));
  // console.log(getDaysInMonth(2, 2012));
  // console.log(getDaysInMonth(9, 2012));
  // console.log(getDaysInMonth(12, 2012));

  function showCalendar(month, year) {
    const firstDay = new Date(year, month).getDay();
    const daysInMonth = 32 - new Date(year, month, 32).getDate();
    const blanks = [];
    for (let i = 0; i < firstDay; i += 1) {
      const key = Math.random();
      blanks.push(<td className="calender__body--blanks" key={key} />);
    }

    const days = [];
    let hasEvent;
    for (let i = 1; i <= daysInMonth; i += 1) {
      const currentDate = i === currentDay;
      const key = Math.random();
      for (let j = 0; j < localState.length; j += 1) {
        const eventDate = new Date(localState[j].date).getDate();
        if (eventDate === i) {
          hasEvent = eventDate;
          break;
        }
      }
      if (hasEvent === i) {
        days.push(
          <td key={key} className="calender__body--has-event">
            <button type="button" onClick={() => openModal(i, month, year)}>
              {i}
            </button>
          </td>,
        );
      } else {
        days.push(
          <td
            key={key}
            className={
              currentDate ? 'calender__body--today' : 'calender__body--date'
            }
          >
            <button type="button" onClick={() => openModal(i, month, year)}>
              {i}
            </button>
          </td>,
        );
      }
    }

    //     const dayHasEvent = [];
    //     for (let i = 1; i <= days.length; i += 1) {
    //       console.log(i);
    //     }

    const slots = [...blanks, ...days];
    const rows = [];
    let cells = [];

    slots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === slots.length - 1) {
        rows.push(cells);
      }
    });

    const dayrows = rows.map((d) => {
      const key = Math.random();
      return <tr key={key}>{d}</tr>;
    });

    return dayrows;
  }

  return (
    <>
      <h1>My Fucking Events</h1>
      <Modal open={open} setOpen={setOpen} dmy={dmy} addEvent={addEvent} />
      <Month
        selectMonth={selectMonth}
        currentMonth={currentMonth}
        year={currentYear}
      />
      <table className="calender">
        <thead className="calender__head">
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody className="calender__body">
          {showCalendar(currentMonth, currentYear)}
        </tbody>
      </table>
    </>
  );
}

export default Calender;
