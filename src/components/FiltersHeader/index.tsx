import {
  Box,
  Button,
  HStack,
  Text,
} from "@chakra-ui/react";



export function FiltersHeader() {
  return (
    <Box
      bg="white"
      padding={8}
      borderRadius="md"
      boxShadow="md"
      w="100%"
      position="fixed"
      zIndex={1}
      top={0}
      left={0}
    >
      <Text>Filtrar</Text>
      <HStack justifyContent="Center">
        <Button
          colorScheme="whatsapp"
          ml={2}
          borderRadius="full"
        >
          Todas
        </Button>
        <Button
          colorScheme="whatsapp"
          ml={2}
          borderRadius="full"
        >
          A fazer
        </Button>
        <Button
          colorScheme="whatsapp"
          ml={2}
          borderRadius="full"
        >
          Feitas
        </Button>
      </HStack>
    </Box>
  );
}
