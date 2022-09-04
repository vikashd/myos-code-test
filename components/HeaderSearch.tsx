import cx from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { Search } from "../components";

type HeaderProps = {
  searchText: string;
  onSearch(text: string): void;
  top?: number;
  searchError?: boolean;
} & React.ComponentProps<typeof Search>;

const HeaderSearch: React.FC<HeaderProps> = ({
  searchText,
  onSearch,
  searchError,
  top = 0,
  ...rest
}) => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);

  const onSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    onSearch(value);
  };

  useEffect(() => {
    const onScrollHandler = () => {
      const updated =
        (searchContainerRef.current?.offsetTop || 0) -
          window.scrollY -
          (top || 0) <=
        1;

      setStuck(() => updated);
    };

    onScrollHandler();
    window.addEventListener("scroll", onScrollHandler);

    return () => {
      document.removeEventListener("scroll", onScrollHandler);
    };
  }, [top]);

  return (
    <div
      className="sticky flex justify-center mb-5 mt-5 z-50"
      style={{ top }}
      ref={searchContainerRef}
    >
      <div
        className={cx("w-full transition-all duration-300 ease", {
          "md:max-w-lg px-4": !stuck,
          "max-w-full": stuck,
        })}
      >
        <Search
          inputClass={cx({
            "!border-t-transparent !border-l-transparent !border-r-transparent focus:border-b-blue-400":
              stuck,
            "!border-red-600": !stuck && searchError,
            "!border-b-red-600 ": stuck && searchError,
          })}
          value={searchText}
          onChange={onSearchHandler}
          placeholder="Search products"
          hasError={searchError}
          {...rest}
        />
      </div>
    </div>
  );
};

export { HeaderSearch };
