import { AiOutlinePlus } from "react-icons/ai";
import { MdExitToApp, MdHome } from "react-icons/md";
import {
  Flex,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";


const handleCreateTask = async (taskPayload: TaskPayload) => {
  const newTask = await TasksService.createNewTask(taskPayload);
  fetchTasks();
};

export function Footer() {
  return (
    <Flex
      p={4}
      justifyContent="space-between"
      position="fixed"
      bottom={0}
      w="100%"
      bg="white"
      left={0}
    >
      <VStack>
        <IconButton
          icon={<MdHome />}
          variant="ghost"
          colorScheme="gray"
          aria-label="Home"
          onClick={() => handleCreateTask({
            description: "Teste",
            active: true,
          })}
        />
        <Text>Home</Text>
      </VStack>
      <VStack>
        <IconButton
          icon={<AiOutlinePlus />}
          colorScheme="whatsapp"
          borderRadius="full"
          aria-label="Adicionar"
          variant= "solid"
        />
        <Text>Adicionar</Text>
      </VStack>
      <VStack>
        <IconButton
          icon={<MdExitToApp />}
          colorScheme="gray"
          variant="ghost"
          aria-label="Sair"
        />
        <Text>Sair</Text>
      </VStack>
    </Flex>
  );
}
