import React, { useCallback, useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { disableWindowScroll, usePrevious } from "../utils";

interface OverlayProps {
  id: string;
  open?: boolean;
  setOpen: (open: boolean) => void;
  top?: number;
  buttons?: React.ReactNode;
}

const Overlay: React.FC<React.PropsWithChildren<OverlayProps>> = ({
  id,
  setOpen,
  open = false,
  top = 0,
  buttons,
  children,
}) => {
  const [hidden, setHidden] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const aRef = useRef<HTMLDivElement>(null);
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const scrollableRef = useRef<HTMLDivElement>(null);
  const buttonContainerHeight = buttonContainerRef?.current?.offsetHeight || 0;
  const [{ overlayTop, contentTop }, setTop] = useState<{
    overlayTop?: number | string;
    contentTop?: string;
  }>({
    overlayTop: -buttonContainerHeight,
    contentTop: `translate3d(0, calc(100% - ${buttonContainerHeight}px), 0)`,
  });

  const containerHeight =
    (containerRef.current?.getBoundingClientRect().top || 0) - top;

  const prevOpen = usePrevious(open);

  const openOverlay = useCallback(() => {
    setTop({
      overlayTop: -containerHeight,
      contentTop: `translate3d(0, 0, 0)`,
    });
  }, [containerHeight]);

  const closeOverlay = useCallback(() => {
    setTop({
      overlayTop: hidden ? -buttonContainerHeight : -containerHeight,
      contentTop: `translate3d(0, calc(100% - ${buttonContainerHeight}px), 0)`,
    });
  }, [buttonContainerHeight, containerHeight, hidden]);

  const onResizeHandler = useCallback(() => {
    const containerHeight =
      (containerRef.current?.getBoundingClientRect().top || 0) - top;

    if (open) {
      setTop({
        overlayTop: -containerHeight,
        contentTop: `translate3d(0, 0, 0)`,
      });
    }
  }, [open, top]);

  const onExitedHandler = () => {
    setTop((prev) => ({
      ...prev,
      overlayTop: -buttonContainerHeight,
    }));

    setHidden(true);
    disableWindowScroll(false, scrollableRef.current!);
  };

  useEffect(() => {
    window.addEventListener("resize", onResizeHandler);
    window.addEventListener("orientationchange", onResizeHandler);
    onResizeHandler();

    return () => {
      window.removeEventListener("resize", onResizeHandler);
      window.removeEventListener("orientationchange", onResizeHandler);
    };
  }, [onResizeHandler, top]);

  useEffect(() => {
    if (open && !prevOpen) {
      disableWindowScroll(true, scrollableRef.current!);
      setHidden(false);
    }

    if (open) {
      if (prevOpen !== open) {
        openOverlay();
      }
    } else {
      closeOverlay();
    }
  }, [open, prevOpen, openOverlay, closeOverlay]);

  useEffect(() => {
    const onKeyListenerHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyListenerHandler);

    return () => {
      document.removeEventListener("keydown", onKeyListenerHandler);
    };
  }, [open, setOpen]);

  useEffect(() => {
    scrollableRef.current?.scrollTo(0, 0);
  }, [id]);

  return (
    <div
      className="relative bg-white sticky bottom-0 right-0 w-full z-[100]"
      ref={containerRef}
    >
      <div
        className="absolute bottom-0 right-0 w-full overflow-hidden"
        style={{ top: overlayTop }}
      >
        <CSSTransition
          in={open}
          addEndListener={(node, done) => {
            node.addEventListener(
              "transitionend",
              (e) => {
                if (e.target === node) {
                  done();
                }
              },
              false
            );
          }}
          classNames="overlay-content"
          onExited={onExitedHandler}
        >
          <div
            className="relative bg-white h-full flex flex-col"
            style={{ transform: contentTop }}
            ref={aRef}
          >
            <div className="bg-white px-2 py-2" ref={buttonContainerRef}>
              {buttons}
            </div>

            <div
              className="flex flex-col grow px-4 pt-4 pb-20 overflow-y-auto"
              ref={scrollableRef}
            >
              {!hidden && children}
            </div>
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};

export { Overlay };
