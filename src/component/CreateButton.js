import React from "react";

const CreateButton = () => {
  return (
    <div className="dashboard_calender_container">
      <a
        className="dashboard_calender_btn"
        href="https://calendar.google.com/calendar/u/0?cid=Mmo0c250OTl2c2plMWlyMGxqc3I2bzhqOWtAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ"
        target="_blank"
        rel="noreferrer"
      >
        <span className="btn-plus">+</span>{" "}
        <span className="btn-create">Create</span>
      </a>
    </div>
  );
};

export default CreateButton;
