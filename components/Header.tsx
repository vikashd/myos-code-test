import React, { useEffect, useRef } from "react";
import { LogoMyos } from "../components/img/LogoMyos";

interface HeaderProps {
  headerRight?: React.ReactNode;
  onHeightChange?(height: number): void;
}

const Header = React.forwardRef<HTMLElement, HeaderProps>(
  function HeaderComponent({ headerRight, onHeightChange }, ref) {
    const headerRef = useRef<HTMLElement>(null);
    const header = (ref || headerRef) as React.RefObject<HTMLElement>;

    useEffect(() => {
      const onResizeHandler = () => {
        onHeightChange?.(header.current?.offsetHeight || 0);
      };

      onResizeHandler();
      window.addEventListener("resize", onResizeHandler);

      return () => {
        document.removeEventListener("resize", onResizeHandler);
      };
    }, [header, onHeightChange]);

    return (
      <header
        className="sticky top-0 z-50 flex items-center justify-between px-5 pt-4 pb-2 md:py-8 bg-white border-y border-gray-300"
        ref={header}
      >
        <h1 className="flex divide-y divide-black flex-col md:flex-row items-end md:items-stretch min-h-[38px] md:min-h-0">
          <LogoMyos className="w-16 md:w-24 fill-black mb-1 md:mb-0" />
          <span className="mx-3 hidden md:block">|</span>
          <span className="text-sm md:text-xl font-bold uppercase tracking-widest">
            Store
          </span>
        </h1>
        {headerRight && <div className="flex items-center">{headerRight}</div>}
      </header>
    );
  }
);

export { Header };
