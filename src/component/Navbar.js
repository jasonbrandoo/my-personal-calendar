import React from 'react';

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar--item">
        <div className="navbar--title">React Calendar</div>
      </div>
      <div className="navbar--item">
        <div className="navbar--link">Events</div>
      </div>
      <div className="navbar--item">
        <div className="navbar--link">About</div>
      </div>
    </div>
  );
}

export default Navbar;
