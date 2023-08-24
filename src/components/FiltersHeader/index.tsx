import {
  Box,
  Button,
  HStack,
  Text,
} from "@chakra-ui/react";

import { useTasks } from "@contexts/index";



export function FiltersHeader() {
  const { tasks, handleUpdateTask, filterState, setFilterState } = useTasks();

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
          colorScheme={filterState === "all" ? "whatsapp" : "gray"}
          ml={2}
          borderRadius="full"
          onClick={() => setFilterState("all")}
        >
          Todas
        </Button>
        <Button
          colorScheme={filterState === "uncompleted" ? "whatsapp" : "gray"}
          ml={2}
          borderRadius="full"
          onClick={() => setFilterState("uncompleted")}
        >
          A fazer
        </Button>
        <Button
          colorScheme={filterState === "completed" ? "whatsapp" : "gray"}
          ml={2}
          borderRadius="full"
          onClick={() => setFilterState("completed")}
        >
          Feitas
        </Button>
      </HStack>
    </Box>
  );
}
