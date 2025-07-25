const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const formatted = date
    .toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .replace(",", " at");

  return formatted;
};

export default formatDate
