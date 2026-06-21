import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

const TimeDate = () => {
  const [currentTime, setCurrentTime] = useState(dayjs());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <p>🕧 {currentTime.format("hh:mm A | DD MMMM YYYY")}</p>;
};

export default TimeDate;
