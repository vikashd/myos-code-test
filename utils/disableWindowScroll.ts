import { disableBodyScroll, enableBodyScroll } from "../vendor/bodyScrollLock";

const disableWindowScroll = (disabled: boolean, element: Element) => {
  if (disabled) {
    disableBodyScroll(element);
  } else {
    enableBodyScroll(element);
  }
};

export { disableWindowScroll };
