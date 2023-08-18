// eslint-disable-next-line import/no-extraneous-dependencies -- ignore
import { menuAnatomy } from "@chakra-ui/anatomy";
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);

// define custom variants
const variants = {
  user: definePartsStyle({
    list: {
      p: 2,
      border: "none",
      backgroundColor: "blackAlpha.500",
      backdropFilter: "blur(12px)",
    },
    item: {
      px: 2,
      color: "white",
      borderRadius: "base",
      backgroundColor: "transparent",
      // _hover: { backgroundColor: "Primary.500" },
      // _focus: { backgroundColor: "Primary.500" },
    },
    divider: {
      borderColor: "white",
      marginY: 1.5,
    },
  }),
};

// define custom styles
const sm = defineStyle({
  fontSize: "sm",
  py: 1,
});

const md = defineStyle({
  fontSize: "md",
});

const xl = defineStyle({
  fontSize: "lg",
  px: "4",
  py: "2",
});

// define custom sizes
const sizes = {
  // apply custom styles to parts
  sm: definePartsStyle({
    item: sm,
    list: {
      ...sm,
      minWidth: "max-content",
    },
    command: sm,
  }),
  md: definePartsStyle({
    item: md,
    list: {
      ...md,
      minWidth: "165px",
    },
    command: sm,
  }),
  xl: definePartsStyle({
    button: xl,
    item: xl,
    groupTitle: { fontSize: "lg" },
    command: xl,
  }),
};

// export the custom variants in the component theme
export const Menu = defineMultiStyleConfig({
  baseStyle: {
    list: {
      boxShadow: "large",
    },
    divider: {
      my: 1,
    },
  },
  variants,
  sizes,
  defaultProps: {
    size: "md",
  },
});
