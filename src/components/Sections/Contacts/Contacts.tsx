"use client";
import { FormData, sendEmail } from "@/api/sendMessage";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import s from "./Contacts.module.css";
import Image from "next/image";
import Modal from "./Modal/Modal";

const Contacts = () => {
  const t = useTranslations("Contacts");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [modalMessage, setModalMessage] = useState("");

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (data.name && data.number) {
      // setModalMessage(t("form.success"));
      setIsModalOpen(true);
      reset();
    } else {
      // setModalMessage(t("form.error"));
      setIsModalOpen(true);
    }
  };

  return (
    <div className={s.section}>
      <h2 className={s.title}>{t("title")}</h2>
      <p className={s.textFirst}>{t("text_1")}</p>
      <p className={s.textSec}>{t("text_2")}</p>
      <div id="contacts" className={s.container}>
        <div className={s.wrappFirstCont}>
          {/* <h2 className={s.title}>{t("title")}</h2>
          <p className={s.textFirst}>{t("text_1")}</p>
          <p className={s.textSec}>{t("text_2")}</p> */}
          <div className={s.formWrapp}>
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

              <button className={s.btnCont} type="submit">
                {t("form.submit")}
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
        </div>
        <div className={s.mapWrapp}>
          <iframe
            className={s.map}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9400.607323511445!2d14.234726050899507!3d53.91127783218897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47aa58cb6b8f4c93%3A0xd6b6c32f3e2c7921!2zTWllY3p5c8WCYXdhIE5pZWR6aWHFgmtvd3NraWVnbyAyLCA3Mi02MDAgxZp3aW5vdWrFm2NpZSwg0J_QvtC70YzRidCw!5e0!3m2!1suk!2sua!4v1761749310507!5m2!1suk!2sua"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        // message={modalMessage}
      />
    </div>
  );
};
export default Contacts;
