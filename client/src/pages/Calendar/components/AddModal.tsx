import React, { FC, useState } from "react";
import dayjs from "dayjs";

const AddModal: FC = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = dayjs(e.target.value);
    setSelectedDate(newDate);
  };

  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box flex flex-col gap-6 items-center">
        <input
          type="text"
          placeholder="Name"
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="text"
          placeholder="Desc"
          className="input input-bordered w-full max-w-xs"
        />
        
        <h3 className="font-bold text-lg">Date</h3>
        <input
          type="date"
          value={selectedDate.format("YYYY-MM-DD")}
          onChange={handleDateChange}
        />
        <button type="button" className="btn">Save</button>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default AddModal;
