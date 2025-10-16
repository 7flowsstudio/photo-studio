export interface FormData {
  name: string;
  number: string;
  message: string;
}

export const sendEmail = async (data: FormData) => {
  const res = await fetch("https://наш-бекенд/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to send email");
  }

  return res.json();
};
