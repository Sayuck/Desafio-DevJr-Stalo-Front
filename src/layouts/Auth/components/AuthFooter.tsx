import React, { memo } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";

interface AuthFooterProps {
  text: string;
  link: string;
  changeAuthState: () => void;
}

export const AuthFooter = memo(
  ({ text, link, changeAuthState }: AuthFooterProps) => (
    <Flex
      flexDirection="column"
      alignItems="center"
      gap="0.25rem"
    >
      <Text>{text}</Text>
      <Button variant="link" onClick={changeAuthState}>
        {link}
      </Button>
    </Flex>
  )
);
AuthFooter.displayName = "AuthFooter";
