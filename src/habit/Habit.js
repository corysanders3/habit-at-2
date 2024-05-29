import React from "react";
import { useState } from "react";

const Habit = ({ hidden, singleHabit }) => {
  const [form, setForm] = useState({
    name: singleHabit.attributes.name,
    plant_id: singleHabit.attributes.plant_id,
    description: singleHabit.attributes.description,
    frequency: singleHabit.attributes.frequency,
    custom_frequency: singleHabit.attributes.custom_frequency,
    start_datetime: "2024/05/17",
    end_datetime: new Date(singleHabit.attributes.end_datetime),
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm((prevForm) => ({
        ...prevForm,
        custom_frequency: {
          ...prevForm.custom_frequency,
          [name]: checked,
        },
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <form
      className={
        hidden
          ? "hidden"
          : `absolute z-10 flex flex-col justify-center items-center w-[60%] h-[80%] bg-slate-500`
      }
      onSubmit={handleSubmit}
    >
      <div>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Plant ID:
          <input
            type="number"
            name="plant_id"
            value={form.plant_id}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Description:
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Frequency:
          <input
            type="text"
            name="frequency"
            value={form.frequency}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Days of the week (Custom Frequency):
          {Object.keys(form.custom_frequency).map((day) => (
            <div key={day}>
              <label>
                {day.charAt(0).toUpperCase() + day.slice(1)}:
                <input
                  type="checkbox"
                  name={day}
                  checked={form.custom_frequency[day]}
                  onChange={handleChange}
                />
              </label>
            </div>
          ))}
        </label>
      </div>
      <div>
        <label>
          Start Date:
          <input
            type="date"
            name="startDate"
            value={form.start_datetime}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          End Date:
          <input
            type="date"
            name="endDate"
            value={form.end_datetime}
            onChange={handleChange}
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Habit;
