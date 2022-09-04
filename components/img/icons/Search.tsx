import { SVGAttributes } from "react";

const Search: React.FC<SVGAttributes<SVGElement>> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    xmlSpace="preserve"
  >
    <path
      d="M453.7 454c-1.3 1.3-3 2-4.7 2-1.7 0-3.4-.7-4.7-2l-143-143.2c-26 23.8-60.6 38.5-98.6 38.5-80.7 0-146.4-65.8-146.4-146.7S122 56 202.7 56s146.4 65.8 146.4 146.7c0 38-14.7 72.6-38.5 98.7l143 143.2c2.7 2.6 2.7 6.8.1 9.4zm-251-384.7c-73.4 0-133.1 59.8-133.1 133.3S129.3 336 202.7 336c73.4 0 133.1-59.8 133.1-133.3S276.2 69.3 202.7 69.3z"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
);

export { Search };
