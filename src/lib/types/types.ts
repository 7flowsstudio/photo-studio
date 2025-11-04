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
  id: number;
  slug: string;
  title: string;
  text: string;
  image: string;
};

type Service = {
    text: string,
    icon: string,
}

export type ServiceCard = {
    id: string,
    name: string,
    description?: string,
    list: Service[]
    price: string
}

export type AdditionalServices = {
    name: string,
    list: Service[],
    image: string
}

export type Advice = {
  id: number;
  title: string;
  details: string;
};

export type Article = {
  title: string;
  details: string;
  advice: Advice[];
};

export type BookingShoot = {
  title: string;
  details: string;
  button: string;
  social: string;
};


