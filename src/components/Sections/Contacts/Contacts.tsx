"use client";
import { FormData, sendEmail } from "@/api/sendMessage";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import s from "./Contacts.module.css";
import Image from "next/image";

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
    <div id="contacts" className={s.container}>
      <h2 className={s.title}>{t("title")}</h2>
      <p className={s.text}>{t("text_1")}</p>
      <p className={s.text}>{t("text_2")}</p>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={s.contInput}>
          {t("form.nameLabel")}
          <input
            className={s.inputCont}
            {...register("name", { required: t("form.requiredName") })}
            placeholder={t("form.namePlaceholder")}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </label>

        <label className={s.contInput}>
          {t("form.numberLabel")}
          <input
            className={s.inputCont}
            {...register("number", {
              required: t("form.requiredNumber"),
              pattern: {
                value: /^[0-9+\s-]+$/,
                message: t("form.invalidNumber"),
              },
            })}
            placeholder={t("form.numberPlaceholder")}
          />
          {errors.number && <p>{errors.number.message}</p>}
        </label>

        <label className={s.contInput}>
          {t("form.messageLabel")}
          <textarea
            className={s.textareaCont}
            {...register("message")}
            placeholder={t("form.messagePlaceholder")}
          />
        </label>

        <button className={s.btnCont} type="submit" disabled={isSubmitting}>
          {isSubmitting ? t("form.sending") : t("form.submit")}
        </button>

        {status === "success" && <p>{t("form.success")}</p>}
        {status === "error" && <p>{t("form.error")}</p>}
      </form>
      <p className={s.textMess}>{t("text_3")}</p>
      <div className={s.btnsCont}>
        <button className={s.btnInst}>
          Instagram
          <Image
            src="/img/icons/arrow-right.svg"
            alt="arrow"
            width={24}
            height={24}
          />
        </button>
        <button className={s.btnFaceb}>
          Facebook
          <Image
            src="/img/icons/arrow-right.svg"
            alt="arrow"
            width={24}
            height={24}
          />
        </button>
      </div>
    </div>
  );
};
export default Contacts;
