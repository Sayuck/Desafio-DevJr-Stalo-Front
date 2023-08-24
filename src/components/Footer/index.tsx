import { signOut } from "next-auth/react";
import { AiOutlineHome, AiOutlinePlus } from "react-icons/ai";
import { MdExitToApp } from "react-icons/md";
import { toast } from "react-toastify";
import {
  Flex,
  Icon,
  IconButton,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

import { DrawerComponent } from "@components/Drawer";
import { useTasks } from "@contexts/index";
import { TasksService } from "@services/Tasks";

export function Footer() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { tasks, handleUpdateTask } = useTasks();

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
          icon={<Icon as={AiOutlineHome} boxSize={8} />} 
          variant="ghost"
          colorScheme="whatsapp"
          aria-label="Home"
        />
        <Text>Home</Text>
      </VStack>
      <VStack>
        <IconButton
          icon={<Icon as={AiOutlinePlus} boxSize={12} />}
          colorScheme="whatsapp"
          borderRadius="full"
          aria-label="Adicionar"
          variant="solid"
          onClick={onOpen}
        />
        <DrawerComponent
          title="Criar Nova Tarefa"
          submitButtonLabel="Criar"
          onSubmit={async ({ task }) => {
            await TasksService.createNewTask({
              description: task,
              completed: false,
            });
            toast.success("Tarefa criada com sucesso!");
            onClose();
            handleUpdateTask();
          }}
          isOpen={isOpen}
          onClose={onClose}
        />
        <Text>Adicionar</Text>
      </VStack>
      <VStack>
        <IconButton
          icon={<Icon as={MdExitToApp} boxSize={8} />}
          colorScheme="gray"
          variant="ghost"
          aria-label="Sair"
          onClick={() => {
            localStorage.removeItem("token");
            signOut({ redirect: true, callbackUrl: "/" });
          }
          }
        />

        <Text>Sair</Text>
      </VStack>
    </Flex>
  );
}
