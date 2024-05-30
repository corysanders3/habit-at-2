import React from "react";
import { useState } from "react";

const Habit = ({ hidden, setHidden, singleHabit, setSingleHabit }) => {
  const [disabled, setDisabled] = useState(true);
  const [form, setForm] = useState({
    name: singleHabit.attributes.name,
    plant_id: singleHabit.attributes.plant_id,
    description: singleHabit.attributes.description,
    frequency: singleHabit.attributes.frequency,
    custom_frequency: singleHabit.attributes.custom_frequency,
    start_datetime: singleHabit.attributes.start_datetime.slice(0, 10),
    end_datetime: singleHabit.attributes.end_datetime.slice(0, 10),
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

  const toggleEdit = () => {
    setDisabled(!disabled);
  };

  const handleClose = () => {
    setHidden(true);
    setSingleHabit(null);
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
          : `absolute z-10 w-[60%] h-[80%] bg-white border-green-500 border-2 rounded-xl px-12 py-12 shadow-lg overflow-y-auto`
      }
      onSubmit={handleSubmit}
    >
      <button
        type="button"
        className="absolute top-2 right-4 font-bold text-xl border-green-500 border-2 rounded-xl px-4 py-2 bg-red-500 text-white hover:bg-red-600"
        onClick={handleClose}
      >
        Close
      </button>
      <div className="mb-4 w-full">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Name:
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            disabled={disabled}
            className="mt-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>
      </div>
      <div className="mb-4 w-full">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Plant ID:
          <input
            type="number"
            name="plant_id"
            value={form.plant_id}
            onChange={handleChange}
            disabled={disabled}
            className="mt-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>
      </div>
      <div className="mb-4 w-full">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Description:
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            disabled={disabled}
            className="mt-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
          />
        </label>
      </div>
      <div className="mb-4 w-full">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Frequency:
          <select
            name="frequency"
            value={form.frequency}
            onChange={handleChange}
            disabled={disabled}
            className="mt-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </label>
      </div>
      <div className="mb-4 w-full">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Days of the week (Custom Frequency):
          {Object.keys(form.custom_frequency).map((day) => (
            <div key={day} className="ml-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name={day}
                  checked={form.custom_frequency[day]}
                  onChange={handleChange}
                  disabled={disabled}
                  className="form-checkbox h-5 w-5 text-green-600"
                />
                <span className="ml-2">
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </span>
              </label>
            </div>
          ))}
        </label>
      </div>
      <div className="mb-4 w-full">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Start Date:
          <input
            type="date"
            name="startDate"
            value={form.start_datetime}
            onChange={handleChange}
            disabled={disabled}
            className="mt-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>
      </div>
      <div className="mb-4 w-full">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          End Date:
          <input
            type="date"
            name="endDate"
            value={form.end_datetime}
            onChange={handleChange}
            disabled={disabled}
            className="mt-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>
      </div>
      <div className="flex items-center justify-between w-full">
        <button
          className="border-green-500 border-2 rounded-xl px-4 py-2 bg-blue-500 text-white hover:bg-blue-600"
          type="button"
          onClick={toggleEdit}
        >
          {disabled ? "Edit" : "Save"}
        </button>
        <button
          className={
            disabled
              ? `border-slate-500 border-2 rounded-xl px-4 py-2 bg-slate-500 text-white opacity-30`
              : `border-green-500 border-2 rounded-xl px-4 py-2 bg-green-500 text-white hover:bg-green-600`
          }
          type="submit"
          disabled={disabled}
        >
          Submit Changes
        </button>
      </div>
    </form>
  );
};

export default Habit;
