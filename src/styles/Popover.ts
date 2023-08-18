// eslint-disable-next-line import/no-extraneous-dependencies -- ignore
import { popoverAnatomy } from "@chakra-ui/anatomy";
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(popoverAnatomy.keys);

// define custom variants
const variants = {
  ghost: definePartsStyle({
    content: {
      border: 0,
      borderRadius: "base",
      bg: "blackAlpha.600",
      backdropFilter: "blur(4px)",
      color: "white",
      _dark: {
        // bg: "blackAlpha.100",
        backdropFilter: "blur(8px)",
      },
    },
    arrow: {},
    header: {
      color: "white",
      bg: "blackAlpha.400",
      border: 0,
      borderTopRadius: "base",
      backdropFilter: "blur(6px)",
      _dark: {
        // bg: "blackAlpha.600",
      },
    },
    closeButton: {
      color: "white",
      top: 2,
      right: 2,
      zIndex: "inherit",
    },
    body: {
      bg: "blackAlpha.300",
    },
    footer: {
      border: 0,
      borderBottomRadius: "base",
      bg: "blackAlpha.400",
      backdropFilter: "blur(6px)",
      _dark: {
        // bg: "blackAlpha.600",
      },
    },
  }),
};

// define custom styles
const sm = defineStyle({});

const md = defineStyle({});

const xl = defineStyle({});

// define custom sizes
const sizes = {
  // apply custom styles to parts
  sm: definePartsStyle({}),
  md: definePartsStyle({}),
  xl: definePartsStyle({}),
};

// export the custom variants in the component theme
export const PopoverTheme = defineMultiStyleConfig({
  variants,
  sizes,
  defaultProps: {
    variant: "ghost",
  },
});
