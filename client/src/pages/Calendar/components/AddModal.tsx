import { FC, useState, useRef, FormEvent } from "react";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { toast } from "react-toastify";
import { createEvent } from "../../../features/event/eventSlice";
import { selectToken } from "../../../features/auth/authSlice";

const AddModal: FC = () => {
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();

  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = dayjs(e.target.value);
    setSelectedDate(newDate);
  };

  const name = useRef<HTMLInputElement | null>(null);
  const desc = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const nameValue = name.current?.value;
    const descValue = desc.current?.value;

    if (!nameValue || !descValue) {
      toast.error("Fill in every detail!");
      return;
    }

    try {
      await dispatch(createEvent({ name: nameValue, description: descValue, token: token!}));
      toast.success("Event creation successful!");
    } catch (error) {
      toast.error("Wrong details!");
      console.error("Event failed:", error);
    }
  };

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6 items-center">
          <h1 className="font-bold text-xl">Create Event Form</h1>
          <input
            type="text"
            placeholder="Name"
            className="input input-bordered w-full max-w-xs"
            ref={name}
          />
          <input
            type="text"
            placeholder="Desc"
            className="input input-bordered w-full max-w-xs"
            ref={desc}
          />
          <div className="flex gap-8">
            <div>
              <h1 className="font-bold text-lg">Start Date</h1>
              <input
                type="date"
                value={selectedDate.format("YYYY-MM-DD")}
                onChange={handleDateChange}
              />
            </div>
            <div>
              <h1 className="font-bold text-lg">End Date</h1>
              <input
                type="date"
                value={selectedDate.format("YYYY-MM-DD")}
                onChange={handleDateChange}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-block max-w-xs">
            Create Event
          </button>
        </div>
      </form>
      </div>
    </dialog>
  );
};

export default AddModal;
