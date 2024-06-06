import "./Calendar.css";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import rrulePlugin from "@fullcalendar/rrule";
import { useEffect, useState } from "react";
import { getHabits, getProgress } from "../apiCalls";
import Habit from "../habit/Habit";
import CompleteIcon from "../assets/checkmark-icon.svg";
import IncompleteIcon from "../assets/incomplete-icon.svg";
import PendingIcon from "../assets/pending-icon.svg";

function Calendar({ userId }) {
  const [error, setError] = useState(null);
  const [userHabits, setHabits] = useState([]);
  const [hidden, setHidden] = useState(true);
  const [singleHabit, setSingleHabit] = useState(null);
  const [userProgress, setUserProgress] = useState({});

  const showUser = async (userId) => {
    try {
      const habits = await getHabits(userId);
      if (habits) {
        setHabits(habits.data);
      }
    } catch (error) {
      setError(error);
    }
  };

  const showProgress = async (userId, habitId) => {
    try {
      const progresses = await getProgress(userId, habitId);

      setUserProgress((prevState) => ({
        ...prevState,
        [habitId]: progresses.data.reduce((acc, progress) => {
          const dateKey = progress.attributes.datetime.slice(0, 10);
          return {
            ...acc,
            [dateKey]: {
              status: progress.attributes.status,
              id: progress.id,
            },
          };
        }, {}),
      }));
    } catch (error) {
      setError(error);
    }
  };
  console.log('userProgress', userProgress)
  const loadProgress = async (userHabits) => {
    await userHabits.forEach((habit) => {
      showProgress(userId, habit.id);
    });
  };

  useEffect(() => {
    showUser(userId);
  }, []);

  useEffect(() => {
    loadProgress(userHabits);
  }, [userHabits]);

  function convertFrequency(frequency) {
    const frequencyDays = Object.keys(frequency);
    const result = frequencyDays.reduce((arr, day) => {
      switch (day) {
        case "monday":
          if (frequency[day]) {
            arr.push("mo");
          }
          break;
        case "tuesday":
          if (frequency[day]) {
            arr.push("tu");
          }
          break;
        case "wednesday":
          if (frequency[day]) {
            arr.push("we");
          }
          break;
        case "thursday":
          if (frequency[day]) {
            arr.push("th");
          }
          break;
        case "friday":
          if (frequency[day]) {
            arr.push("fr");
          }
          break;
        case "saturday":
          if (frequency[day]) {
            arr.push("sa");
          }
          break;
        case "sunday":
          if (frequency[day]) {
            arr.push("su");
          }
          break;
        default:
          return;
      }
      return arr;
    }, []);
    return result;
  }

  const parsedEvents = userHabits.map((event) => {
    return {
      id: event.id,
      title: event.attributes.name,
      start: event.attributes.start_datetime.slice(0, 10),
      rrule: {
        freq: event.attributes.frequency,
        interval: 1,
        byweekday:
          event.attributes.frequency === "monthly"
            ? null
            : convertFrequency(event.attributes.custom_frequency),
        dtstart: event.attributes.start_datetime.slice(0, 10),
        until: event.attributes.end_datetime.slice(0, 10),
      },
    };
  });

  const handleEventClick = (info) => {
    if (info.jsEvent.target.classList.contains("fc-event-checkbox")) {
      info.jsEvent.preventDefault();
    }
    const targetHabit = userHabits.find((event) => {
      return event.id === info.event._def.publicId;
    });
    const specificDate = convertDateObject(info.event._instance.range.end);
    targetHabit.date = specificDate;
    setSingleHabit(targetHabit);
    setHidden(false);
  };

  const convertDateObject = (dateObject) => {
    const date = new Date(dateObject);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  const renderEventContent = (eventInfo) => {
    const contentId = parseInt(eventInfo.event._def.publicId);
    const contentDate = convertDateObject(eventInfo.event.start);
    console.log('!!!', userProgress[contentId][contentDate])
    return (
      <div className="flex justify-between items-center cursor-pointer px-2">
        <span className="font-bold text-wrap">{eventInfo.event.title}</span>
        {userProgress[contentId][contentDate].status === "incomplete" && (
          <img className="h-6 py-1" src={PendingIcon} />
        )}
        {userProgress[contentId][contentDate].status === "skipped" && (
          <img className="h-6 py-1" src={IncompleteIcon} />
        )}
        {userProgress[contentId][contentDate].status === "completed" && (
          <img className="h-6 py-1" src={CompleteIcon} />
        )}
      </div>
    );
  };

  return (
    <section className="calendar-page flex flex-col">
      <Fullcalendar
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          rrulePlugin,
        ]}
        initialView={"dayGridMonth"}
        height={"90%"}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={parsedEvents}
        eventClick={handleEventClick}
        eventContent={
          Object.keys(userProgress).length === userHabits.length &&
          renderEventContent
        }
      />
      {singleHabit && (
        <Habit
          hidden={hidden}
          setHidden={setHidden}
          singleHabit={singleHabit}
          setSingleHabit={setSingleHabit}
          userId={userId}
          setHabits={setHabits}
          userProgress={userProgress}
        />
      )}
    </section>
  );
}

export default Calendar;
