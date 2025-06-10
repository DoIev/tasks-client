import { useState, useEffect, useRef } from "react";
import { Chip, Center } from "@mantine/core";
import { FETCH_INTERVAL } from "../../config.js";

export const FetchStatusChip = ({ onTasksFetched }) => {
  const [chipColor, setChipColor] = useState("gray");
  const [lastUpdate, setLastUpdate] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(FETCH_INTERVAL);
  const timerRef = useRef();

  const getTasks = async () => {
    await onTasksFetched(); // This calls fetchTasks from the hook in the parent!
    setLastUpdate(new Date());
    setChipColor("green");
    setSecondsLeft(FETCH_INTERVAL);
    setTimeout(() => setChipColor("gray"), 1000);
  };

  useEffect(() => {
    let seconds = FETCH_INTERVAL;
    getTasks();
    timerRef.current = setInterval(() => {
      seconds -= 1;
      if (seconds <= 0) {
        getTasks();
        seconds = FETCH_INTERVAL;
      }
      setSecondsLeft(seconds);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <Center mb="md">
      <Chip
        checked
        color={chipColor}
        variant="light"
        size="md"
        style={{ pointerEvents: "none", fontWeight: 500 }}
      >
        עדכון אחרון:{" "}
        {lastUpdate ? lastUpdate.toLocaleTimeString() : "לא עודכן"}
        {" | "}
        עדכון הבא בעוד {secondsLeft} שניות
      </Chip>
    </Center>
  );
};