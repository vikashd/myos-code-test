import React, { useCallback, useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

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
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const buttonContainerHeight = buttonContainerRef?.current?.offsetHeight || 0;
  const [{ overlayTop, contentTop }, setTop] = useState<{
    overlayTop?: number;
    contentTop?: string;
  }>({
    overlayTop: -buttonContainerHeight,
    contentTop: `translateY(calc(100% - ${buttonContainerHeight}px))`,
  });

  const containerHeight =
    (containerRef.current?.getBoundingClientRect().top || 0) - top;

  const disableWindowScroll = (disabled: boolean) => {
    document.body.style.overflow = disabled ? "hidden" : "";
  };

  const openOverlay = useCallback(() => {
    disableWindowScroll(true);
    setHidden(false);
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

  useEffect(() => {
    const onResizeHandler = () => {
      window.requestAnimationFrame(() => {
        if (open) {
          setTop({
            overlayTop: -containerHeight,
            contentTop: `translate3d(0, 0, 0)`,
          });
        }
      });
    };

    onResizeHandler();
    window.addEventListener("resize", onResizeHandler);

    return () => {
      window.removeEventListener("resize", onResizeHandler);
    };
  }, [open, top, openOverlay, containerHeight]);

  useEffect(() => {
    open ? openOverlay() : closeOverlay();
  }, [open, openOverlay, closeOverlay]);

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

  return (
    <div
      className="relative bg-white sticky bottom-0 right-0 w-full z-50"
      ref={containerRef}
    >
      <div
        className="absolute bottom-0 right-0 w-full overflow-hidden z-50"
        style={{ top: overlayTop }}
      >
        <CSSTransition
          in={open}
          addEndListener={(node, done) => {
            node.addEventListener("transitionend", done, false);
          }}
          classNames="cart-content"
          onExited={() => {
            setTop((prev) => ({
              ...prev,
              overlayTop: -buttonContainerHeight,
            }));
            setHidden(true);
            disableWindowScroll(false);
          }}
        >
          <div
            className="relative bg-white h-full flex flex-col"
            style={{ transform: contentTop }}
          >
            <div className="bg-white px-2 py-2" ref={buttonContainerRef}>
              {buttons}
            </div>
            {!hidden && (
              <div
                key={id}
                className="flex flex-col grow px-4 pt-4 pb-20 overflow-y-auto"
              >
                {children}
              </div>
            )}
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};

export { Overlay };
