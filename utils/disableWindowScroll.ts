const disableWindowScroll = (disabled: boolean) => {
  document.body.style.overflow = disabled ? "hidden" : "";
};

export { disableWindowScroll };
