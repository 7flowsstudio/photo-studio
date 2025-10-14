declare module "react-slick" {
  import * as React from "react";

  interface Settings {
    className?: string;
    adaptiveHeight?: boolean;
    arrows?: boolean;
    autoplay?: boolean;
    autoplaySpeed?: number;
    centerMode?: boolean;
    dots?: boolean;
    infinite?: boolean;
    slidesToShow?: number;
    slidesToScroll?: number;
    speed?: number;
    [key: string]: unknown;
  }

  export default class Slider extends React.Component<Settings> {}
}
