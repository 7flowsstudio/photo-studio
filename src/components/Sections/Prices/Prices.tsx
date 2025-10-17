import {useMessages, useTranslations} from "next-intl";
import {ServiceCard} from "@/lib/types/types";

export const Prices = () => {
    const t = useTranslations("Prices");

    const messages = useMessages() as any;
    const packages = (messages.Prices.packages ?? []) as ServiceCard[];

    return (
        <section>
            <h2>
                {t("title")}
            </h2>

            <ul>
                {packages.map(pkg => (
                    <li key={pkg.id}>
                        <h3>{pkg.name}</h3>
                        <p>{pkg.description}</p>
                        {pkg.list.length >0 && (
                            <ul>
                                {pkg.list.map((item, i) => (
                                    <li key={i}>
                                        <svg width={24} height={24}>
                                            <use href={item.icon} />
                                        </svg>
                                        <span>{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <p>{pkg.price}</p>
                    </li>
                ))}
            </ul>
        </section>
    )
}