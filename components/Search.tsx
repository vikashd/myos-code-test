import cx from "classnames";
import React from "react";
import { IconSearch } from "./img/icons";
import { TextInput } from "./TextInput";

type SearchProps = React.ComponentProps<typeof TextInput> & {
  inputClass?: string;
};

const Search: React.FC<SearchProps> = ({ className, inputClass, ...rest }) => (
  <TextInput
    icon={IconSearch}
    iconClass={className}
    inputClass={inputClass}
    {...rest}
  />
);

export { Search };
