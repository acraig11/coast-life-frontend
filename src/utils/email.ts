export function formatDateForEmail(d: Date) {
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function openEmailWithSelectedDates(
  selectedDates: Date[],
  to = "CoastLifeLLC@gmail.com"
) {
  if (!selectedDates.length) return;

  const subject = "Booking request — selected dates";

  const body = [
    "Hello Coast Life,",
    "",
    "I’d like to request booking for these dates:",
    ...selectedDates
      .slice()
      .sort((a, b) => a.getTime() - b.getTime())
      .map((d) => `• ${formatDateForEmail(d)}`),
    "",
    "Name:",
    "Phone:",
    "Notes:",
  ].join("\n");

  window.location.href =
    `mailto:${encodeURIComponent(to)}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;
}
