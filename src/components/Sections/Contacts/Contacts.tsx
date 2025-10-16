"use client";
import { FormData, sendEmail } from "@/api/sendMessage";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import s from "./Contacts.module.css";

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
    <div className={s.container}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={s.contInput}>
          {t("nameLabel")}
          <input
            className={s.inputCont}
            {...register("name", { required: t("requiredName") })}
            placeholder={t("namePlaceholder")}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </label>

        <label className={s.contInput}>
          {t("numberLabel")}
          <input
            className={s.inputCont}
            {...register("number", {
              required: t("requiredNumber"),
              pattern: { value: /^[0-9+\s-]+$/, message: t("invalidNumber") },
            })}
            placeholder={t("numberPlaceholder")}
          />
          {errors.number && <p>{errors.number.message}</p>}
        </label>

        <label className={s.contInput}>
          {t("messageLabel")}
          <textarea
            className={s.textareaCont}
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
    </div>
  );
};
export default Contacts;
