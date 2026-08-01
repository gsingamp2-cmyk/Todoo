import { useEffect, useState } from "react";
import StreakAPI from "../services/streakApi";
import StreakForm from "../components/StreakForm";
import StreakCalendar from "../components/StreakCalendar";

function StreakPage() {
  const [streaks, setStreaks] = useState([]);

  // Fetch all streaks
  const fetchStreaks = async () => {
    try {
      const response = await StreakAPI.get("/");

      console.log("Fetched streaks:", response.data);

      setStreaks(response.data);
    } catch (error) {
      console.log("Fetch streak error:", error);
    }
  };

  // Add new streak
  const addStreak = async (title, startDate, numberOfDays) => {
    try {
      console.log("Creating streak:", {
        title,
        startDate,
        numberOfDays,
      });

      const response = await StreakAPI.post("/", {
        title,
        startDate,
        numberOfDays,
      });

      console.log("Created streak:", response.data);

      setStreaks((previousStreaks) => [
        response.data,
        ...previousStreaks,
      ]);
    } catch (error) {
      console.log("Create streak error:", error);
    }
  };

  const deleteStreak = async (id) => {
  try {
    await StreakAPI.delete(`/${id}`);

    setStreaks((previousStreaks) =>
      previousStreaks.filter(
        (streak) => streak._id !== id
      )
    );
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    fetchStreaks();
  }, []);

  return (
    <div className="streak-page">
      <h2>🔥 Streak Tracker</h2>

      <StreakForm addStreak={addStreak} />
      <StreakCalendar streaks={streaks} />

        <div className="streak-list">
            {streaks.length === 0 ? (
                <p className="no-streaks">
                No streaks yet.
                </p>
            ) : (
                streaks.map((streak) => {
                const completedDays =
                    streak.completedDates?.length || 0;

                const progress = Math.round(
                    (completedDays / streak.numberOfDays) * 100
                );

                return (
                    <div
                    className="streak-card"
                    key={streak._id}
                    >
                    <div className="streak-card-info">
                        <strong>🔥 {streak.title}</strong>

                        <span>
                        {completedDays} / {streak.numberOfDays} completed
                        </span>

                        <div className="streak-progress">
                        <div
                            className="streak-progress-fill"
                            style={{ width: `${progress}%` }}
                        />
                        </div>
                    </div>

                    <button
                        className="streak-delete-btn"
                        onClick={() => deleteStreak(streak._id)}
                    >
                        Delete
                    </button>
                    </div>
                );
                })
            )}
        </div>




    </div>
  );
}

export default StreakPage;