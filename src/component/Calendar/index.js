import React, { useState, useEffect } from 'react';
import Month from './Month';
import Modal from '../Modal';
import monthNames from '../../utils/calender';

function Calendar() {
  const today = new Date();
  const currentDay = today.getDate();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [dmy, setDMY] = useState({});
  const [event, setEvent] = useState({});
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
    setLocalState(prevState => [...prevState, newEvent]);
  }

  function openModal(d, m, y) {
    const matchEvent = localState.find(
      value =>
        new Date(value.date).getDate() === d &&
        new Date(value.date).getMonth() === m,
    );
    setOpen(prevState => !prevState);
    setDMY({
      date: d,
      month: m,
      year: y,
    });
    if (matchEvent) {
      setEvent(matchEvent);
    } else {
      setEvent({});
    }
  }

  function showCalendar(month, year) {
    const firstDay = new Date(year, month).getDay();
    const daysInMonth = 32 - new Date(year, month, 32).getDate();

    /*
     * I THINK THIS CODE NEED REFACTORING
     *
     * Check if state have event
     * and fill it in array
     *
     * @return array (currentDaysInMonthHasEvent)
     * @return array (currentMonthHasEvent)
     * @return array (currentDateHasEvent)
     */
    const currentDaysInMonthHasEvent = [];
    const currentMonthHasEvent = [];
    const currentDateHasEvent = [];
    localState.forEach(({ date }) => {
      const dateHasEvent = new Date(date);
      const exactDateEvent = dateHasEvent.getDate();
      const yearHasEvent = dateHasEvent.getFullYear();
      const monthHasEvent = dateHasEvent.getMonth();
      currentDaysInMonthHasEvent.push(
        new Date(yearHasEvent, monthHasEvent + 1, 0).getDate(),
      );
      currentMonthHasEvent.push(monthHasEvent);
      currentDateHasEvent.push(exactDateEvent);
    });

    /*
     * Previous month
     *
     * @return array (blanks)
     */
    const blanks = [];
    for (let i = 0; i < firstDay; i += 1) {
      const key = Math.random();
      blanks.push(<td className="calender__body--blanks" key={key} />);
    }

    /*
     * I THINK THIS CODE NEED REFACTORING
     *
     * Check if each month has event
     *
     * @return boolean (checkMonth)
     * @return number (totalEventDayInMonth)
     * @return array (dateHaveEventInMonth)
     */
    let checkMonth = false;
    let totalEventDayInMonth;
    const dateHaveEventInMonth = [];
    for (let j = 0; j < currentMonthHasEvent.length; j += 1) {
      if (monthNames[currentMonthHasEvent[j]] === monthNames[currentMonth]) {
        for (let k = 0; k < currentDaysInMonthHasEvent.length; k += 1) {
          if (currentDaysInMonthHasEvent[k] === daysInMonth) {
            checkMonth = true;
            totalEventDayInMonth = currentDaysInMonthHasEvent[k];
          }
        }
      }
    }
    for (let l = 0; l < localState.length; l += 1) {
      const tes = new Date(localState[l].date).getMonth();
      if (monthNames[tes] === monthNames[currentMonth]) {
        dateHaveEventInMonth.push(
          new Date(year, tes, currentDateHasEvent[l]).getDate(),
        );
      }
    }

    /*
     * Fill calender with current date
     * and check if current month have event
     *
     * @return array (days)
     */
    const days = [];
    let hasEvent;
    if (checkMonth) {
      for (let i = 1; i <= totalEventDayInMonth; i += 1) {
        const currentDate =
          i === currentDay && currentMonth === new Date().getMonth();
        const key = Math.random();
        for (let j = 0; j < dateHaveEventInMonth.length; j += 1) {
          if (dateHaveEventInMonth[j] === i) {
            hasEvent = dateHaveEventInMonth[j];
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
    } else {
      for (let i = 1; i <= daysInMonth; i += 1) {
        const currentDate =
          i === currentDay && currentMonth === new Date().getMonth();
        const key = Math.random();
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

    /*
     * Fill date each week
     *
     * @return array (rows)
     */
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

    /*
     * Fill each row with date
     *
     * @return React.Component
     */
    const dayrows = rows.map(d => {
      const key = Math.random();
      return <tr key={key}>{d}</tr>;
    });

    return dayrows;
  }

  return (
    <>
      <h1>My Events</h1>
      <Modal
        open={open}
        setOpen={setOpen}
        dmy={dmy}
        addEvent={addEvent}
        event={event}
      />
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

export default Calendar;
