import s from "@/components/Sections/Portfolio/Categories/Categories.module.css";
import {useTranslations} from "next-intl";

type Category = {
    type: string;
    name: string;
}

type Props = {
    selectedType: string;
    onSelect: (type: string) => void;
}

export const Categories = ({selectedType, onSelect}:Props) => {
    const t = useTranslations("Portfolio");

    const categories = t.raw('categories') as Category[];

    return (
        <ul className={s.categories_list}>
            {categories.map((category) => {
                const isActive = category.type === selectedType;
                return (
                    <li key={category.type} className={s.categories_item_wrap}>
                        <button
                            type="button"
                            aria-selected={isActive}
                            className={`${s.categories_item} ${isActive && s.active}`}
                            onClick={() => onSelect(category.type)}
                        >
                            {category.name}
                        </button>
                    </li>
                )
            })}
        </ul>
    )
}
