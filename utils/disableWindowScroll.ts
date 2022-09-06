import { disableBodyScroll, enableBodyScroll } from "../vendor/bodyScrollLock";

const disableWindowScroll = (disabled: boolean, element: Element) => {
  console.log(disabled);
  if (disabled) {
    disableBodyScroll(element);
  } else {
    enableBodyScroll(element);
  }
};

export { disableWindowScroll };
