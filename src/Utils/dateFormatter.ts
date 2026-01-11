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

export function getDateStyling(dateString: string): string {
  const date = parseDate(dateString);
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  if (diffDays < 0) {
    // Past date
    return "bg-red-500/30 border-red-500/50 text-red-200";
  } else if (diffDays < 7) {
    // Within a week
    return "bg-orange-500/30 border-orange-500/50 text-orange-200";
  } else {
    // Good - more than a week away
    return "bg-white/20 border-white/30 text-white";
  }
}
