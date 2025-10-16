"use client";
import { FormData, sendEmail } from "@/api/sendMessage";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

const Contacts = () => {
  const t = useTranslations("Contacts");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setStatus("idle");
    try {
      await sendEmail(data);
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ maxWidth: 400, margin: "0 auto" }}
    >
      <input
        {...register("name", { required: "Введіть ім’я" })}
        placeholder="Ваше ім’я"
      />
      {errors.name && <p>{errors.name.message}</p>}

      <input
        {...register("number", {
          required: "Введіть номер телефону",
          pattern: { value: /^[0-9+\s-]+$/, message: "Некоректний номер" },
        })}
        placeholder="Номер телефону"
      />
      {errors.number && <p>{errors.number.message}</p>}

      <textarea {...register("message")} placeholder="Повідомлення" />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Відправка..." : "Відправити"}
      </button>

      {status === "success" && <p>✅ Заявку надіслано!</p>}
      {status === "error" && <p>❌ Помилка при надсиланні.</p>}
    </form>
  );
};
export default Contacts;
