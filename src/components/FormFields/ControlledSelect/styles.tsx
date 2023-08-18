import { Checkbox, Flex } from "@chakra-ui/react";
import {
  chakraComponents,
  ChakraStylesConfig,
  GroupBase,
  SelectComponentsConfig,
} from "chakra-react-select";
import { memoize } from "lodash";

export const getChakraStyles = <
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>(): ChakraStylesConfig<Option, IsMulti, Group> => ({
  container: (provided) => ({
    ...provided,
    cursor: "pointer",
    borderRadius: "base",
  }),
  dropdownIndicator: (prev, { selectProps }) => ({
    ...prev,
    paddingInlineStart: 2.5,
    paddingInlineEnd: 2.5,
    background: "transparent",
    "> svg": {
      transform: `rotate(${
        selectProps.menuIsOpen ? 180 : 0
      }deg)`,
      fontSize: "1.4rem",
      transition: "transform 0.2s",
    },
  }),
  menu: (provided) => ({
    ...provided,
    border: 0,
    backdropFilter: "blur(12px)",
    background: "transparent",
    cursor: "default",
    zIndex: 9999,
  }),
  menuList: (provided) => ({
    ...provided,
    background: "blackAlpha.600",
    backdropFilter: "blur(4px)",
    border: 0,
    boxShadow: "large",
    _dark: {
      // background: "blackAlpha.300",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "white" : "white",
    fontWeight: "medium",
    // eslint-disable-next-line no-nested-ternary -- Chakra UI
    background: state?.isMulti
      ? "transparent"
      : state.isSelected
      ? "whiteAlpha.500"
      : "transparent",

    // Keyboard navigation highlight
    ...(state.isFocused &&
      (!state.isSelected || state.isMulti) && {
        background: "blackAlpha.100",
      }),

    _hover: {
      background: "blackAlpha.100",
    },

    _dark: {
      color: state.isSelected ? "white" : "TextPrimary",
      // eslint-disable-next-line no-nested-ternary -- Chakra UI
      background: state?.isMulti
        ? "transparent"
        : state.isSelected
        ? "whiteAlpha.300"
        : "transparent",
    },
  }),
});

export const chakraStyles = memoize(getChakraStyles);

// Make sure this is defined outside of the component which returns your select
// or you'll run into rendering issues
export const getCustomComponents = <
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>(): SelectComponentsConfig<Option, IsMulti, Group> => ({
  Option: ({ children, ...props }) => (
    <chakraComponents.Option {...props}>
      <Flex alignItems="center" gap={2}>
        {props.isMulti && (
          <Checkbox
            isChecked={props.isSelected}
            colorScheme="orange"
            size="lg"
          />
        )}
        {children}
      </Flex>
    </chakraComponents.Option>
  ),
  LoadingIndicator: (props) => {
    const { isDisabled } = props;

    return (
      <chakraComponents.LoadingIndicator
        color={isDisabled ? "gray.300" : "Primary.500"}
        emptyColor="transparent"
        {...props}
      />
    );
  },
});

export const customComponents = memoize(
  getCustomComponents
);
