export type Project = {
  id: number;
  name: string;
};

export type ArrowProps = {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  direction: "next" | "prev";
};

export type Review = {
  text: string;
  author: string;
  role: string;
};

export type Item = {
	id: string;
	category: string;
	url: string;
	alt: string;
};

export type CardText = {
  id: number,
  slug: string,
  title: string,
  text: string,
  image: string
}

type Service = {
    text: string,
    icon: string,
}
export type ServiceCard = {
    id: string,
    name: string,
    description?: string,
    list: Service[]
    price?: string
}