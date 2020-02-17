import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import monthNames from '../utils/calender';

const defaultProps = {
  event: {},
};

const propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  dmy: PropTypes.shape({
    date: PropTypes.number,
    month: PropTypes.number,
    year: PropTypes.number,
  }).isRequired,
  addEvent: PropTypes.func.isRequired,
  event: PropTypes.shape({
    note: PropTypes.string,
    date: PropTypes.string,
  }),
};

function Modal({ open, setOpen, dmy, addEvent, event }) {
  const [input, setInput] = useState(event);

  useEffect(() => {
    setInput(event);
  }, [event]);

  function handleInput(e) {
    setInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    addEvent(event, dmy.date, dmy.month, dmy.year);
    setOpen(false);
    setInput('');
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
            value={input.note ? input.note : ''}
          />
          <div className="modal__button">
            <button
              type="button"
              className="modal__button--cancel"
              onClick={() => {
                setOpen(false);
                setInput({});
              }}
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

Modal.defaultProps = defaultProps;
Modal.propTypes = propTypes;

export default Modal;
