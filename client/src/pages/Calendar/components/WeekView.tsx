import { FC } from "react";

import { Scheduler } from "@aldabil/react-scheduler";

const WeekView: FC = () => {
    

  return (
      <Scheduler
          fields={[
              {
                  name: "Description",
                  type: "input",
                  config: { label: "Details", multiline: true, rows: 4 }
              },
              {
                  name: "Color",
                  type: "input",
                  config: {label: "Color"}
              }
          ]}
          month={{
              weekDays: [0, 1, 2, 3, 4, 5, 6],
              weekStartOn: 1,
              startHour: 9,
              endHour: 17,
              navigation: true,
              disableGoToDay: false
          }}
          week={{
              weekDays: [0, 1, 2, 3, 4, 5, 6],
              weekStartOn: 1,
              startHour: 1,
              endHour: 24,
              step: 60,
              navigation: true,
              disableGoToDay: false
          }}
          day={{
              startHour: 1,
              endHour: 24,
              step: 60,
              navigation: true
          }}
          view="month"
          events={[
              {
                  event_id: 1,
                  title: "Event 1",
                  start: new Date("2023/12/4 09:30"),
                  end: new Date("2023/12/4 10:30"),
                  Description: "valami",
                  color: "#ff0000",
              },
              {
                  event_id: 2,
                  title: "Event 2",
                  start: new Date("2023/12/6 10:00"),
                  end: new Date("2023/12/6 11:00"),
                  Description: "tesztleszezis"
              },
          ]}
      />
  );
};

export default WeekView;
