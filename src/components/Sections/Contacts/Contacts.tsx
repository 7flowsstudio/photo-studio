"use client";
import { FormData, sendEmail } from "@/api/sendMessage";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

const Contacts = () => {
  const t = useTranslations("Contacts.form");
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
      <label>
        {t("nameLabel")}
        <input
          {...register("name", { required: t("requiredName") })}
          placeholder={t("namePlaceholder")}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </label>

      <label>
        {t("numberLabel")}
        <input
          {...register("number", {
            required: t("requiredNumber"),
            pattern: { value: /^[0-9+\s-]+$/, message: t("invalidNumber") },
          })}
          placeholder={t("numberPlaceholder")}
        />
        {errors.number && <p>{errors.number.message}</p>}
      </label>

      <label>
        {t("messageLabel")}
        <textarea
          {...register("message")}
          placeholder={t("messagePlaceholder")}
        />
      </label>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? t("sending") : t("submit")}
      </button>

      {status === "success" && <p>{t("success")}</p>}
      {status === "error" && <p>{t("error")}</p>}
    </form>
  );
};
export default Contacts;
