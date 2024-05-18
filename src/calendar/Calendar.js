import "./Calendar.css";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { mockEvents } from "../mockData/mockHabits";

function Calendar() {
  function convertFrequency(frequency) {
    const frequencyStatus = Object.values(frequency);
    const result = frequencyStatus.reduce((arr, status, index) => {
      if (status) {
        if (index === 6) {
          arr.push(0);
        } else {
          arr.push(index + 1);
        }
      }
      return arr;
    }, []);
    return result;
  }

  const parsedEvents = mockEvents.map((event) => {
    return {
      id: event.id,
      title: event.attributes.name,
      startRecur: event.attributes.start_datetime.slice(0, 10),
      endRecur: event.attributes.end_datetime.slice(0, 10),
      daysOfWeek:
        event.attributes.frequency === "weekly"
          ? convertFrequency(event.attributes.custom_frequency)
          : null,
    };
  });

  const handleEventClick = (info) => {
    console.log(
      mockEvents.find((event) => {
        return event.id === info.event._def.publicId;
      })
    );
  };

  return (
    <section className="calendar-page">
      <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
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
    </section>
  );
}

export default Calendar;
