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
