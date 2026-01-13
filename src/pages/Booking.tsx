import { useMemo, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { openEmailWithSelectedDates } from "../utils/email";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

function isSameDay(a?: Date | null, b?: Date | null) {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function CalendarPage() {
  const [value, setValue] = useState<Value>(null);

  /** Expand range into individual days (inclusive) */
  const selectedDates = useMemo<Date[]>(() => {
    if (!value) return [];

    // Single date
    if (!Array.isArray(value)) {
      return value instanceof Date ? [value] : [];
    }

    const [start, end] = value;
    if (!(start instanceof Date)) return [];
    if (!(end instanceof Date)) return [start];

    const a = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    const b = new Date(end.getFullYear(), end.getMonth(), end.getDate());

    const from = a <= b ? a : b;
    const to = a <= b ? b : a;

    const days: Date[] = [];
    const cur = new Date(from);

    while (cur <= to) {
      days.push(new Date(cur));
      cur.setDate(cur.getDate() + 1);
    }

    return days;
  }, [value]);

  /** Allow unselect by clicking a selected day */
  function handleClickDay(clicked: Date) {
    // No selection yet → start selection
    if (!value) {
      setValue(clicked);
      return;
    }

    // Single date selected
    if (value instanceof Date) {
      // Clicking the same date → unselect
      if (isSameDay(value, clicked)) {
        setValue(null);
        return;
      }
      // Otherwise let react-calendar form a range
      setValue([value, clicked]);
      return;
    }

    // Range selected
    if (Array.isArray(value)) {
      const [start, end] = value;

      // If clicking any date inside the selected range → clear
      if (
        start instanceof Date &&
        end instanceof Date &&
        clicked >= start &&
        clicked <= end
      ) {
        setValue(null);
        return;
      }

      // Otherwise start a new selection
      setValue(clicked);
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <h1>Calendar</h1>

      <div style={{ marginTop: 16, display: "flex", justifyContent: "center" }}>
        <div style={{ border: "1px solid #ddd", padding: 12, borderRadius: 12 }}>
          <Calendar
            value={value}
            selectRange
            onClickDay={handleClickDay}
          />
        </div>
      </div>

      {/* Email button */}
      <div style={{ marginTop: 12, display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <button
  onClick={() => openEmailWithSelectedDates(selectedDates)}
  disabled={selectedDates.length === 0}
  style={{
    padding: "10px 16px",
    borderRadius: 10,
    border: "none",
    fontWeight: 600,
    color: "#fff",
    backgroundColor: selectedDates.length ? "#007AFF" : "#c7c7cc",
    cursor: selectedDates.length ? "pointer" : "not-allowed",
    opacity: selectedDates.length ? 1 : 0.7,
    transition: "background-color 0.2s ease, opacity 0.2s ease",
  }}
>
  {selectedDates.length
    ? `Email selected date range (${selectedDates.length} day${
        selectedDates.length === 1 ? "" : "s"
      })`
    : "Select a date or range to email"}
</button>

          <small style={{ color: "#777" }}>
            Click a date to start a range. Click a selected date again to clear.
          </small>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <h3>Selected:</h3>
        <pre
          style={{
            padding: 12,
            background: "#f7f7f7",
            borderRadius: 8,
            whiteSpace: "pre-wrap",
          }}
        >
          {selectedDates.length
            ? selectedDates.map((d) => d.toDateString()).join("\n")
            : "—"}
        </pre>
      </div>
    </div>
  );
}
