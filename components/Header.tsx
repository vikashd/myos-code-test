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
      const setHeight = () => {
        onHeightChange?.(header.current?.offsetHeight || 0);
      };

      setHeight();

      const observer = new ResizeObserver(setHeight);
      observer.observe(header.current!);

      return () => {
        observer.disconnect();
      };
    }, [header, onHeightChange]);

    return (
      <header
        className="sticky top-0 flex items-center justify-between px-5 py-3 md:py-8 bg-white border-y border-gray-300 z-50"
        ref={header}
      >
        <h1 className="relative flex divide-y divide-black flex-col md:flex-row items-end md:items-stretch top-[4px] min-h-[38px] md:top-0 md:min-h-0">
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
