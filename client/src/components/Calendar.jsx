import { useState } from "react";

function Calendar({ selectedDate, setSelectedDate }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

const today = new Date();

const todayDate =
  `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(
    today.getDate()
  ).padStart(2, "0")}`;


  const monthName = currentDate.toLocaleString("default", {
    month: "long",
  });

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const days = [];

  // Empty cells before first day of month
  for (let i = 0; i < firstDay; i++) {
    days.push(
      <div
        key={`empty-${i}`}
        className="calendar-empty"
      ></div>
    );
  }

  // Actual dates
  for (let day = 1; day <= daysInMonth; day++) {
    const date =
      `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    days.push(
      <button
        key={date}
        className={`calendar-day
            ${date === todayDate ? "today" : ""}
            ${selectedDate === date ? "selected" : ""}
        `}
        onClick={() => setSelectedDate(date)}
        >
        {day}
        </button>
    );
  }

  return (
    <div className="calendar">

      <div className="calendar-header">
        <button onClick={previousMonth}>←</button>

        <h2>
          {monthName} {year}
        </h2>

        <button onClick={nextMonth}>→</button>
      </div>

      <div className="calendar-weekdays">
        <span>Sun</span>
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
      </div>

      <div className="calendar-grid">
        {days}
      </div>

    </div>
  );
}

export default Calendar;