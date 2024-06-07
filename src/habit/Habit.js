import React from "react";
import { useState, useEffect } from "react";
import moment from "moment";
import { deleteHabit, completeHabit, updateHabit } from "../apiCalls";
import flowerOne from "../images/flowers/flowerID_1.png";
import flowerTwo from "../images/flowers/flowerID_2.png";
import flowerThree from "../images/flowers/flowerID_3.png";
import flowerFour from "../images/flowers/flowerID_4.png";

const Habit = ({
  hidden,
  setHidden,
  singleHabit,
  setSingleHabit,
  userId,
  userProgress,
}) => {
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
  const today = moment().format("YYYY-MM-DD");
  const [isToday, setIsToday] = useState(false);

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

  function reorderDaysOfWeek(obj) {
    const orderedDays = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];
    const orderedObj = {};

    orderedDays.forEach((day) => {
      if (obj.hasOwnProperty(day)) {
        orderedObj[day] = obj[day];
      }
    });

    return orderedObj;
  }

  const toggleEdit = () => {
    setDisabled(!disabled);
  };

  const handleClose = () => {
    setHidden(true);
    setSingleHabit(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedContent = {
      habit: {
        name: form.name,
        description: form.description
      }
    }
    updateHabit(userId, singleHabit.id, updatedContent);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleDelete = () => {
    deleteHabit(userId, singleHabit.id);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleComplete = () => {
    const progressId = userProgress[singleHabit.id][singleHabit.date].id;
    completeHabit(userId, singleHabit.id, progressId);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  useEffect(() => {
    if (moment(today).isSame(singleHabit.date)) {
      setIsToday(true);
    }
  }, []);

  return (
    <form
      className={
        hidden
          ? "hidden"
          : `absolute z-10 w-[60%] h-[80%] bg-white border-green-500 border-2 rounded-xl px-12 py-8 shadow-lg overflow-y-auto`
      }
      onSubmit={handleSubmit}
    >
      <button
        type="button"
        className="absolute top-5 right-4 font-bold text-lg rounded-xl px-4 py-2 bg-red-500 text-white hover:bg-red-600"
        onClick={handleClose}
      >
        Close
      </button>
      <h1 className="text-green-600 text-4xl font-bold mb-4">Habit View</h1>
      <h2 className="mb-4 pr-48 text-lg">
        Habits can only be logged as complete on the day of the habit occurence. 
        Once a habit is created, you can only edit the fields in{" "}
        <span className="text-green-500 font-extrabold">green</span>. If you'd
        like to change{" "}
        <span className="font-extrabold text-red-400">plant</span>,{" "}
        <span className="font-extrabold text-red-400">frequency</span>, or{" "}
        <span className="font-extrabold text-red-400">start/end dates</span>{" "}
        please delete this habit and create a new one.
      </h2>
      <div className="flex items-center justify-start gap-4 w-full mb-12">
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
        <button
          className={
            isToday
              ? `border-green-500 border-2 rounded-xl px-4 py-2 bg-green-500 text-white hover:bg-green-600`
              : `border-slate-500 border-2 rounded-xl px-4 py-2 bg-slate-500 text-white opacity-30`
          }
          type="button"
          disabled={!isToday}
          onClick={handleComplete}
        >
          Mark Habit Complete
        </button>
        <button
          className={
            disabled
              ? `border-rose-800 border-2 rounded-xl px-4 py-2 bg-rose-900 text-white mx-4 opacity-20`
              : `border-rose-800 border-2 rounded-xl px-4 py-2 bg-rose-900 text-white mx-4`
          }
          type="button"
          disabled={disabled}
          onClick={handleDelete}
        >
          Delete Habit
        </button>
      </div>
      <div className="mb-4 w-full">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Name:
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            disabled={disabled}
            className={
              disabled
                ? `mt-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-green-100`
                : `mt-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-green-300`
            }
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
            className={
              disabled
                ? `mt-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24 bg-green-100`
                : `mt-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24 bg-green-300`
            }
          />
        </label>
      </div>
      <div className="flex flex-col mb-4 w-full">
        <h3 className="block text-gray-700 text-sm font-bold mb-2">
          Plant ID: {form.plant_id}
        </h3>
        {form.plant_id === 1 && (
          <img className="h-16 w-12" src={flowerOne} alt="flower one" />
        )}
        {form.plant_id === 2 && (
          <img className="h-16 w-12" src={flowerTwo} alt="flower two" />
        )}
        {form.plant_id === 3 && (
          <img className="h-16 w-12" src={flowerThree} alt="flower three" />
        )}
        {form.plant_id === 4 && (
          <img className="h-16 w-12" src={flowerFour} alt="flower four" />
        )}
      </div>
      <div className="mb-4 w-full">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Frequency:
          <select
            name="frequency"
            value={form.frequency}
            onChange={handleChange}
            disabled={true}
            className="mt-1 shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-rose-100"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </label>
      </div>
      <div className="mb-4 w-full shadow bg-rose-100 rounded-lg px-2 py-2 leading-tight focus:outline-none focus:shadow-outline">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Days of the Week (Custom Frequency):
          {Object.keys(reorderDaysOfWeek(form.custom_frequency)).map((day) => (
            <div key={day} className="ml-4 mt-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name={day}
                  checked={form.custom_frequency[day]}
                  onChange={handleChange}
                  disabled={true}
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
            disabled={true}
            className="mt-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-rose-100"
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
            disabled={true}
            className="mt-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-rose-100"
          />
        </label>
      </div>
    </form>
  );
};

export default Habit;
