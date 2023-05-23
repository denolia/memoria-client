import type {
  DateSelectArg,
  EventChangeArg,
  EventClickArg,
  EventContentArg,
} from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import dayjs from "dayjs";
import React, { useMemo } from "react";
import { useItems } from "../state/ItemContext";
import { useItemDrawer } from "../state/ItemDrawerContext";
import type { IndexedItems, Item } from "../types";

function renderEventContent(eventContent: EventContentArg) {
  return (
    <div style={{ overflow: "hidden", textOverflow: "ellipsis", padding: "4px 8px" }}>
      {eventContent.event.title}
    </div>
  );
}

export function Calendar({ items }: { items: IndexedItems }) {
  const { setOpenDrawer } = useItemDrawer();

  const { updateItem } = useItems();

  const initialEvents = useMemo(
    () =>
      Object.values(items).map((item) => ({
        ...item,
        date: item.dueDate ?? undefined,
      })),
    [items]
  );

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    setOpenDrawer(true, { dueDate: dayjs(selectInfo.startStr).format("YYYY-MM-DD") });
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    setOpenDrawer(true, items[clickInfo.event.id]);
  };

  function onEventChange(eventData: EventChangeArg) {
    const { id } = eventData.event;
    const dueDate = dayjs(eventData.event.startStr).format("YYYY-MM-DD");
    if (!id || !dueDate) {
      return;
    }

    const updatedTask: Item = { ...items[id], dueDate };
    updateItem(updatedTask);
  }

  return (
    <div className="demo-app">
      <div className="demo-app-main">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth",
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
          eventChange={onEventChange}
        />
      </div>
    </div>
  );
}
