import React from "react";
import { Box, Card } from "@chakra-ui/react";

import { ColorMode } from "@components/ColorMode";

export type AuthTemplateProps = {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
};

export function AuthLayout({
  children,
  header,
  footer,
}: AuthTemplateProps) {
  return (
    <Box
      position="relative"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      padding="0.75rem"
    >
      <Card
        padding="1.5rem"
        width="100%"
        maxWidth="400px"
        marginBottom="1rem"
        boxShadow="lg"
      >
        <Box marginBottom="2rem">{header}</Box>
        {children}
      </Card>

      {footer}

      <Box position="absolute" bottom={4} right={4}>
        <ColorMode />
      </Box>
    </Box>
  );
}
