import type {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  EventInput,
} from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import React, { useRef, useState } from "react";
import type { IndexedItems, Item } from "../types";

let eventGuid = 0;
const todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

export function createEventId() {
  eventGuid += 1;
  return String(eventGuid);
}

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: "All-day event",
    start: todayStr,
  },
  {
    id: createEventId(),
    title: "Timed event",
    start: `${todayStr}T12:00:00`,
  },
];

// export function Calendar() {
//   return (
//     <FullCalendar
//       plugins={[dayGridPlugin]}
//       initialView="dayGridMonth"
//       events={[
//         { title: "event 1", date: "2023-05-23" },
//         { title: "event 2", date: "2023-05-26" },
//       ]}
//       eventContent={renderEventContent}
//     />
//   );
// }

function renderEventContent(eventContent: EventContentArg) {
  return (
    <>
      {/* <b>{eventContent.}</b> */}
      <i style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{eventContent.event.title}</i>
    </>
  );
}

export function Calendar({ items }: { items: IndexedItems }) {
  const initialEvents = useRef<Item[]>(
    Object.values(items).map((item) => ({
      ...item,
      date: item.dueDate,
    }))
  );
  const [_, setEvents] = useState<Item[]>(initialEvents.current);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  };

  const handleEvents = (events: EventApi[]) => {
    // @ts-ignore
    setEvents(events);
  };

  return (
    <div className="demo-app">
      <div className="demo-app-main">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          editable
          selectable
          selectMirror
          dayMaxEvents
          weekends
          events={initialEvents.current} // alternatively, use the `events` setting to fetch from a feed
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
        />
      </div>
    </div>
  );
}
