import { Chip, Center } from "@mantine/core";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const FETCH_INTERVAL = 5; // seconds

export const FetchStatusChip = ({ onTasksFetched }) => {
  const [chipColor, setChipColor] = useState("gray");
  const [lastUpdate, setLastUpdate] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(FETCH_INTERVAL);
  const timerRef = useRef();

  const fetchTasks = async () => {
    const tasksFetched = await axios.get("http://localhost:3001/api/tasks");
    onTasksFetched(tasksFetched.data);
    setLastUpdate(new Date());
    setChipColor("green");
    setSecondsLeft(FETCH_INTERVAL);
    setTimeout(() => setChipColor("gray"), 1000);
  };

  useEffect(() => {
    fetchTasks();
    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          fetchTasks();
          return FETCH_INTERVAL;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line
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