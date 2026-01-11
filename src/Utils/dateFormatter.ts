export function formatDate(dateString: string): string {
  const [day, month, year] = dateString.split("-");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${day} ${monthNames[parseInt(month) - 1]} ${year}`;
}

export function parseDate(dateString: string): Date {
  const [day, month, year] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}
