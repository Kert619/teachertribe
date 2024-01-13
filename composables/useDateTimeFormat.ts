export function useDateTimeFormat() {
  const format = (datetime: string) => {
    return new Date(datetime).toLocaleString("en-PH", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      hour12: true,
      minute: "numeric",
      second: "numeric",
    });
  };

  return { format };
}
