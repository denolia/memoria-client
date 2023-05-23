import type { DateSelectArg, EventClickArg, EventContentArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayjs from "dayjs";
import React from "react";
import { useItemDrawer } from "../state/ItemDrawerContext";
import type { IndexedItems } from "../types";

let eventGuid = 0;

export function createEventId() {
  eventGuid += 1;
  return String(eventGuid);
}

function renderEventContent(eventContent: EventContentArg) {
  return (
    <div style={{ overflow: "hidden", textOverflow: "ellipsis", padding: "4px 8px" }}>
      {eventContent.event.title}
    </div>
  );
}

export function Calendar({ items }: { items: IndexedItems }) {
  const { setOpenDrawer } = useItemDrawer();

  // todo memoise this
  const initialEvents = Object.values(items).map((item) => ({
    ...item,
    date: item.dueDate ?? undefined,
  }));

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setOpenDrawer(true, { dueDate: dayjs(selectInfo.startStr).format("YYYY-MM-DD") });
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
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
          events={initialEvents}
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
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
