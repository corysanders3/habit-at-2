import './Calendar.css';
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"

function Calendar() {

    return (
        <section className='calendar-page'>
            <Fullcalendar 
            className="calendar"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={"dayGridMonth"}
            />
        </section>
    )
}

export default Calendar;