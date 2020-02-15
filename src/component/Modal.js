import React, { useState } from 'react';
import monthNames from '../utils/calender';

function Modal({ open, setOpen, dmy, addEvent }) {
  const [event, setEvent] = useState('');

  function handleInput(e) {
    setEvent(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    addEvent(event, dmy.date, dmy.month, dmy.year);
    setOpen(false);
    setEvent('');
  }

  return (
    <div className={open ? 'modal--show' : 'modal--close'}>
      <div className="modal__content">
        <form className="modal__form" onSubmit={handleSubmit}>
          <label htmlFor="input" className="modal__header">
            {`Add Event for ${dmy.date} ${monthNames[dmy.month]} ${dmy.year}`}
          </label>
          <textarea
            id="input"
            className="modal__input"
            onChange={handleInput}
            value={event}
          />
          <div className="modal__button">
            <button
              type="button"
              className="modal__button--cancel"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="modal__button--add">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
