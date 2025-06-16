import React, { useState } from "react";

function EventForm({ data, onSave, onDelete, onCancel }) {
  const [title, setTitle] = useState(data.title || "");
  const [start, setStart] = useState(data.start || "09:00");
  const [end, setEnd] = useState(data.end || "10:00");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && start < end) {
      onSave({ ...data, title: title.trim(), start, end });
    }
  };

  return (
    <div className="form-overlay">
      <form className="form" onSubmit={handleSubmit}>
        <h3>{data.day}</h3>
        <input
          type="text"
          value={title}
          placeholder="Nazwa wydarzenia"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="time"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          required
        />
        <input
          type="time"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          required
        />

        <div className="form-buttons">
          <button type="submit" className="save">💾 Zapisz</button>
          <button type="button" className="cancel" onClick={onCancel}>❌ Anuluj</button>
          {data.title && (
            <button type="button" onClick={() => onDelete(data)} style={{ backgroundColor: "red", color: "white" }}>
              🗑️ Usuń
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default EventForm;
