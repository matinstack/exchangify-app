"use client";

import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Skeleton } from "@/components/ui/skeleton";

const TimeDate = () => {
  const [currentTime, setCurrentTime] = useState<dayjs.Dayjs>();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!currentTime) return <Skeleton className="h-4 w-48" />;

  return (
    <p className="hidden lg:block">
      🕧 {currentTime.format("hh:mm A | DD MMMM YYYY")}
    </p>
  );
};

export default TimeDate;
