export const ProcessUrl = async (url: string) => {
  const response = await fetch("/api/process-url", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });
  return response;
};