import { DEFAULT_PORTFOLIO } from "../constants/messages";

type PortfolioImageProps = {
  img: string | File | null;
  name: string;
};

export function PortfolioImage({ img, name }: PortfolioImageProps) {
  let imgSrc: string;

  if (img instanceof File) {
    imgSrc = URL.createObjectURL(img);
  } else if (typeof img === "string") {
    imgSrc = img;
  } else {
    imgSrc = DEFAULT_PORTFOLIO.DEFAULT_IMAGE;
  }

  return (
    <img
      src={imgSrc}
      alt={`${name}'s portfolio image`}
      className="size-16 rounded-full object-cover"
    />
  );
}
