import { Text } from "@chakra-ui/react";
import { Props } from "chakra-react-select";
import { memoize } from "lodash";

export const handleEmptyOptions: Props["noOptionsMessage"] = memoize(
  (state) => (
    <Text color="gray.300">
      Nenhum resultado para pesquisa{" "}
      <Text as="span" fontWeight="semibold" p={0.5} bg="primary">
        {state.inputValue}
      </Text>
    </Text>
  )
);
