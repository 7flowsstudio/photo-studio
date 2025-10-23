import {useMessages, useTranslations} from "next-intl";
import {AdditionalServices, ServiceCard} from "@/lib/types/types";
import Image from "next/image";
import s from "./Prices.module.css"

export const Prices = () => {
    const t = useTranslations("Prices");

    const messages = useMessages();
    const packages = (messages.Prices.packages ?? []) as ServiceCard[];
    const additional = (messages.Prices.additional ?? []) as AdditionalServices;

    return (
        <section className={s.services_section}>
            <h2 className={s.services_title}>
                {t("title")}
            </h2>

            <ul className={s.packages}>
                {packages.map(pkg => (
                    <li className={s.package_item} key={pkg.id}>
                        <div>
                            <h3 className={s.package_item_name}>{pkg.name}</h3>
                            <p  className={s.package_item_desc}>{pkg.description}</p>
                            {pkg.list.length >0 && (
                                <ul className={s.package_list}>
                                    {pkg.list.map((item, i) => (
                                        <li className={s.package_list_item} key={i}>
                                            <svg className={s.package_list_item_icon}>
                                                <use href={item.icon} />
                                            </svg>
                                            <p className={s.package_list_item_text}>{item.text}</p>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <p className={s.package_item_price}>{pkg.price}</p>
                    </li>
                ))}
                <li className={s.additional_pack}>
                    <div className={s.additional_pack_wrap}>
                        <h3 className={s.additional_pack_name}>{t("additional.name")}</h3>
                        {additional.list.length >0 && (
                            <ul className={s.additional_pack_list}>
                                {additional.list.map((item, i) => (
                                    <li className={s.package_list_item} key={i}>
                                        <Image className={s.package_list_item_icon} src={item.icon} alt={"icon"} width={24} height={24} />
                                        <p className={s.additional_pack_text}>{item.text}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <button className={s.orderBtn}>{t("orderBtn")}</button>
                    </div>

                    <Image
                        className={s.image}
                        src={additional.image}
                        alt={"camera"}
                        width={343}
                        height={391}
                    />
                </li>
            </ul>
        </section>
    )
}