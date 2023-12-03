import { FC, useState, useEffect } from "react";
import { getMonth, isSameDay } from "../../../utils/calendarUtils";
import dayjs, { Dayjs } from "dayjs";

interface Props {
  date: Dayjs;
}

const MonthView: FC<Props> = ({date}) => {
  const [month, setMonth] = useState<Dayjs[][]>(getMonth(date.year(), date.month()));
  
  useEffect(() => {
    setMonth(getMonth(date.year(), date.month()));
  }, [date]);

  const today = dayjs();

  return (
    <div className="flex flex-wrap justify-center mb-8">
      <div>
        {month.map((week, weekIndex) => (
          <div key={weekIndex} className="flex w-full">
            {week.map((day, dayIndex) => (
              <div key={dayIndex}>
                <div className="flex justify-center ">
                  {weekIndex === 0 && (
                    <p className="text-2xl mt-1">
                      {day.format("ddd").toUpperCase()}
                    </p>
                  )}
                </div>

                <div
                  key={dayIndex}
                  className={`flex items-start justify-start w-1/7 p-4 border ${isSameDay(day, today) ? "border-white" : "border-base-200"} w-52 h-24`}
                >
                  {day ? day.date() : ""}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthView;
