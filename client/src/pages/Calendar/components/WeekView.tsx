import { FC, useEffect, useRef } from "react";
import { Scheduler } from "@aldabil/react-scheduler";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectToken, selectUser } from "../../../features/auth/authSlice";
import { toast } from "react-toastify";
import {
  createEvent,
  getEventByUserId,
  selectEvents,
} from "../../../features/event/eventSlice";
import dayjs from "dayjs";
import { ProcessedEvent, SchedulerRef } from "@aldabil/react-scheduler/types";
import { Event } from "../../../types/Event";

const WeekView: FC = () => {
  const user = useAppSelector(selectUser);
  const token = useAppSelector(selectToken);
  const events = useAppSelector(selectEvents);
  const dispatch = useAppDispatch();

  const calendarRef = useRef<SchedulerRef>(null);

  const handleSubmit = async (e: ProcessedEvent) => {
    const startDateObject = dayjs(e.start).format("YYYY-MM-DD HH:mm:ss");
    const endDateObject = dayjs(e.end).format("YYYY-MM-DD HH:mm:ss");

    try {
      await dispatch(
        createEvent({
          name: e.title,
          description: e.Description,
          startDate: startDateObject,
          endDate: endDateObject,
          token: token!,
        })
      );
      toast.success("Event creation successful!");
    } catch (error) {
      toast.error("Wrong details!");
      console.error("Event creation failed:", error);
    }

    return e;
  };

  useEffect(() => {
    dispatch(getEventByUserId({ userId: user!.userId, token: token! }));
  }, [dispatch, user, token]);

  console.log(events);

  const transformEvents = (events: Event[]): ProcessedEvent[] => {
    return events.map((event) => {
      const startDate = dayjs(event.startDate).toDate();
      const endDate = dayjs(event.endDate).toDate();

      return {
        event_id: event.id,
        title: event.name,
        start: startDate,
        end: endDate,
        Description: event.description,
      };
    });
  };

  const transformedEvents = transformEvents(events);

  console.log(transformedEvents);

  return (
    <div className="m-4">
      <Scheduler
        ref={calendarRef}
        fields={[
          {
            name: "Description",
            type: "input",
            config: { label: "Details", multiline: true, rows: 4 },
          },
        ]}
        month={{
          weekDays: [0, 1, 2, 3, 4, 5, 6],
          weekStartOn: 1,
          startHour: 9,
          endHour: 17,
          navigation: true,
          disableGoToDay: false,
        }}
        week={{
          weekDays: [0, 1, 2, 3, 4, 5, 6],
          weekStartOn: 1,
          startHour: 1,
          endHour: 24,
          step: 60,
          navigation: true,
          disableGoToDay: false,
        }}
        day={{
          startHour: 1,
          endHour: 24,
          step: 60,
          navigation: true,
        }}
        view="month"
        onConfirm={handleSubmit}
        events={transformedEvents}
      />
    </div>
  );
};

export default WeekView;
