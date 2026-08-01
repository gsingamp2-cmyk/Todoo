import { useState } from "react";

function StreakForm({ addStreak }) {
  const [title, setTitle] = useState("");

  const getToday = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const [startDate, setStartDate] = useState(getToday());
  const [numberOfDays, setNumberOfDays] = useState(7);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    if (numberOfDays < 1) return;

    addStreak(title, startDate, Number(numberOfDays));

    setTitle("");
    setNumberOfDays(7);
  };

  return (
    <form className="streak-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter streak task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

      <input
        type="number"
        min="1"
        placeholder="Days"
        value={numberOfDays}
        onChange={(e) => setNumberOfDays(e.target.value)}
      />

      <button type="submit">
        Create
      </button>
    </form>
  );
}

export default StreakForm;