import { useState } from "react";

function StreakCalendar({ streaks }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

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

  // Check whether a streak is active on a particular date
  const isStreakActiveOnDate = (streak, date) => {
    const startDate = streak.startDate.split("T")[0];

    const start = new Date(`${startDate}T00:00:00`);

    const end = new Date(start);
    end.setDate(
      end.getDate() + Number(streak.numberOfDays) - 1
    );

    const current = new Date(`${date}T00:00:00`);

    return current >= start && current <= end;
  };

  const days = [];

  // Empty cells
  for (let i = 0; i < firstDay; i++) {
    days.push(
      <div
        key={`empty-${i}`}
        className="streak-calendar-empty"
      />
    );
  }

  // Calendar days
  for (let day = 1; day <= daysInMonth; day++) {
    const date =
      `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    // Which streaks should exist on this date?
    const activeStreaks = streaks.filter((streak) =>
      isStreakActiveOnDate(streak, date)
    );

    const total = activeStreaks.length;

    // How many were completed on this date?
    const completed = activeStreaks.filter((streak) =>
      streak.completedDates?.includes(date)
    ).length;

    days.push(
      <div
        key={date}
        className="streak-calendar-day"
      >
        <span className="streak-day-number">
          {day}
        </span>

        {total > 0 && (
          <span
            className={`streak-fraction ${
              completed === total ? "streak-perfect" : ""
            }`}
          >
            {completed}/{total}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="streak-calendar">
      <div className="streak-calendar-header">
        <button onClick={previousMonth}>←</button>

        <h3>
          {monthName} {year}
        </h3>

        <button onClick={nextMonth}>→</button>
      </div>

      <div className="streak-calendar-weekdays">
        <span>Sun</span>
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
      </div>

      <div className="streak-calendar-grid">
        {days}
      </div>
    </div>
  );
}

export default StreakCalendar;