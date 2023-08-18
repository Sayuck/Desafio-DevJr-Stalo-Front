import {
  BsFillMoonFill,
  BsFillSunFill,
} from "react-icons/bs";
import {
  IconButton,
  IconButtonProps,
  useColorMode,
} from "@chakra-ui/react";

interface ColorModeProps
  extends Omit<IconButtonProps, "aria-label"> {}

export function ColorMode(props: ColorModeProps) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="color-mode"
      onClick={toggleColorMode}
      variant={colorMode === "light" ? "solid" : "outline"}
      {...props}
    >
      {colorMode === "light" ? (
        <BsFillMoonFill />
      ) : (
        <BsFillSunFill />
      )}
    </IconButton>
  );
}
