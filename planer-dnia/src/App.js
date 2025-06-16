import React, { useState, useEffect } from "react";
import "./App.css";
import EventForm from "./EventForm";

const days = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"];
const ROWS = 15; // liczba wierszy

function App() {
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem("calendarEvents");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);

  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);

  const handleCellClick = (day, row) => {
    setSelectedEvent({
      day,
      row,
      title: "",
      start: "09:00",
      end: "10:00"
    });
    setSelectedPosition({ day, row });
  };

  const handleSave = (eventData) => {
    setEvents((prev) => {
      const filtered = prev.filter(
        (e) => !(e.day === selectedPosition.day && e.row === selectedPosition.row)
      );
      return [...filtered, { ...eventData, day: selectedPosition.day, row: selectedPosition.row }];
    });
    setSelectedEvent(null);
    setSelectedPosition(null);
  };

  const handleDelete = (eventData) => {
    setEvents((prev) =>
      prev.filter(
        (e) =>
          !(
            e.day === eventData.day &&
            e.row === eventData.row &&
            e.title === eventData.title
          )
      )
    );
    setSelectedEvent(null);
    setSelectedPosition(null);
  };

  return (
    <div className="App">
      <h1>Kalendarz tygodniowy</h1>

      {selectedEvent && (
        <EventForm
          data={selectedEvent}
          onSave={handleSave}
          onDelete={handleDelete}
          onCancel={() => {
            setSelectedEvent(null);
            setSelectedPosition(null);
          }}
        />
      )}

      <div className="calendar-table">
        <div className="calendar-header">
          <div className="cell header"></div>
          {days.map((day) => (
            <div key={day} className="cell header">
              {day}
            </div>
          ))}
        </div>

        {Array.from({ length: ROWS }, (_, row) => (
          <div className="calendar-row" key={row}>
            <div className="cell hour">
              {
                (() => {
                  const rowEvents = events.filter(e => e.row === row);
                  if (rowEvents.length > 0) {
                    const sorted = rowEvents.sort((a, b) => a.start.localeCompare(b.start));
                    return `${sorted[0].start}–${sorted[sorted.length - 1].end}`;
                  }
                  return "";
                })()
              }
            </div>


            {days.map((day) => {
              const event = events.find((e) => e.day === day && e.row === row);
              return (
                <div
                  key={`${day}-${row}`}
                  className="cell event-cell"
                  onClick={() => handleCellClick(day, row)}
                >
                  {event && (
                    <div className="event-content" onClick={(e) => e.stopPropagation()}>
                      {event.title}
                      <button className="delete-btn" onClick={() => handleDelete(event)}>×</button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
