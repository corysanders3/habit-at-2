import "./Calendar.css";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import rrulePlugin from "@fullcalendar/rrule";
import { useEffect, useState } from "react";
import { getHabits } from "../apiCalls";
import Habit from "../habit/Habit";

function Calendar() {
  const [error, setError] = useState();
  const [userHabits, setHabits] = useState([]);
  const [userId, setUserId] = useState(1);
  const [hidden, setHidden] = useState(true);
  const [singleHabit, setSingleHabit] = useState(null);

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

  useEffect(() => {
    showUser(userId);
  }, []);

  function convertFrequency(frequency) {
    const frequencyDays = Object.keys(frequency);
    const result = frequencyDays.reduce((arr, day) => {
      switch (day) {
        case "monday":
          if(frequency[day]) {
            arr.push("mo");
          }
          break;
        case "tuesday":
          if(frequency[day]) {
            arr.push("tu");
          }
          break;
        case "wednesday":
          if(frequency[day]) {
            arr.push("we");
          }
          break;
        case "thursday":
          if(frequency[day]) {
            arr.push("th");
          }
          break;
        case "friday":
          if(frequency[day]) {
            arr.push("fr");
          }
          break;
        case "saturday":
          if(frequency[day]) {
            arr.push("sa");
          }
          break;
        case "sunday":
          if(frequency[day]) {
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
      rrule: {
        freq: event.attributes.frequency,
        interval: 1,
        byweekday: event.attributes.frequency === "monthly" ?  null : convertFrequency(event.attributes.custom_frequency),
        dtstart: event.attributes.start_datetime.slice(0,10),
        until: event.attributes.end_datetime.slice(0, 10)
      }
    };
  });

  const handleEventClick = (info) => {
    const targetHabit = userHabits.find((event) => {
      return event.id === info.event._def.publicId;
    });
    setSingleHabit(targetHabit);
    setHidden(false);
  };
  console.log(parsedEvents);
  return (
    <section className="calendar-page flex flex-col">
      <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, rrulePlugin]}
        initialView={"dayGridMonth"}
        height={"90%"}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={parsedEvents}
        eventClick={handleEventClick}
      />
      {singleHabit && (
        <Habit
          hidden={hidden}
          setHidden={setHidden}
          singleHabit={singleHabit}
          setSingleHabit={setSingleHabit}
        />
      )}
    </section>
  );
}

export default Calendar;
