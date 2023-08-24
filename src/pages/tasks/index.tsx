import React, { useCallback } from "react";
import { useSession } from "next-auth/react";
import {
  BiDotsVerticalRounded,
  BiEdit,
  BiTrash,
} from "react-icons/bi";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Radio,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { format } from "date-fns";

import { DrawerComponent } from "@components/Drawer";
import { Modal } from "@components/Modal";
import { useTasks } from "@contexts/index";
import { TasksService } from "@services/Tasks";

const ToDoList: React.FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { data: session } = useSession();
  const { tasks, handleUpdateTask } = useTasks();
  const [isTaskModalOpen, setIsTaskModalOpen] =
    React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState<
    Task | undefined
  >();

  const openTaskModal = (task: Task) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  const closeTaskModal = useCallback(() => {
    setSelectedTask(undefined);
    setIsTaskModalOpen(false);
  }, []);

  const [currentTask, setCurrentTask] =
    React.useState<Task>();

  const handleDeleteTask = async (taskId: number) => {
    await TasksService.deleteExistingTask(taskId);
    handleUpdateTask();
  };

  console.log(tasks, "tasks lixosas");

  const handleTaskStatusChange = async (task: Task) => {
    await TasksService.updateExistingTask(task.id, {
      completed: !task.completed,
      description: task.description,
    });
    handleUpdateTask();
  };

  const totalTasks = tasks?.length;
  const completedTasks = tasks?.filter?.(
    (task) => task.completed
  ).length;

  return (
    <Container padding={20} maxW="container.lg">
      <Text>
        {new Date().toLocaleDateString("pt-BR", {
          weekday: "short",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </Text>
      <Card
        boxShadow="md"
        size="lg"
        height="500px"
        padding={16}
        overflowY="auto"
      >
        {tasks?.map?.((task) => (
          <Flex
            key={task.id}
            align="center"
            mt={2}
            cursor="pointer"
            boxShadow="sm"
            py={2}
          >
            <Radio
              isChecked={task.completed}
              mr={2}
              colorScheme="whatsapp"
              onClick={() => handleTaskStatusChange(task)}
            />
            <Text
              flexGrow={1}
              isTruncated
              onClick={() => openTaskModal(task)}
            >
              {task.description}
            </Text>
            <Menu>
              <MenuButton
                as={IconButton}
                icon={
                  <BiDotsVerticalRounded color="gray" />
                }
                variant="ghost"
                size="sm"
              />
              <MenuList>
                <MenuItem
                  icon={
                    <BiEdit color="gray" fontSize={25} />
                  }
                  onClick={() => {
                    setCurrentTask(task);
                    onOpen();
                  }}
                >
                  Editar
                </MenuItem>
                <MenuItem
                  icon={
                    <IoMdCheckmarkCircle
                      color="green"
                      fontSize={25}
                    />
                  }
                  onClick={() =>
                    handleTaskStatusChange(task)
                  }
                >
                  Concluir
                </MenuItem>
                <MenuItem
                  icon={
                    <BiTrash color="red" fontSize={25} />
                  }
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Excluir
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        ))}
      </Card>
      <Box>
        <Flex justify="space-between" mt={4}>
          <Text>
            Total de tarefas {completedTasks}/{totalTasks}
          </Text>
        </Flex>
      </Box>
      <DrawerComponent
        title="Editar Tarefa"
        submitButtonLabel="Salvar"
        onSubmit={async ({ task }) => {
          await TasksService.updateExistingTask(
            currentTask?.id as number,
            {
              description: task,
              completed: currentTask?.completed ?? false,
            }
          );
          toast.success("Tarefa Editada com sucesso!");
          onClose();
          handleUpdateTask();
        }}
        isOpen={isOpen}
        onClose={onClose}
      />
      <Modal
        isOpen={isTaskModalOpen}
        onClose={closeTaskModal}
        title="Detalhes da Tarefa"
      >
        {selectedTask && (
          <>
            <Text>
              <strong>ID:</strong> {selectedTask.id}
            </Text>
            <Text>
              <strong>Descrição:</strong>{" "}
              {selectedTask.description}
            </Text>
            <Text>
              <strong>Status:</strong>{" "}
              {selectedTask.completed
                ? "Concluída"
                : "Pendente"}
            </Text>
            <Text>
              <>
                <strong>Data de criação:</strong>{" "}
                {format(
                  new Date(selectedTask.created_at),
                  "dd/MM/yyyy"
                )}
              </>
            </Text>
            <Text>
              <>
                <strong>Última atualização:</strong>{" "}
                {format(
                  new Date(selectedTask.updated_at),
                  "dd/MM/yyyy"
                )}
              </>
            </Text>
          </>
        )}
        <Flex justify="center">
          <Button
            aria-label="Fechar modal"
            colorScheme="whatsapp"
            onClick={closeTaskModal}
          >
            Voltar para a Home
          </Button>
        </Flex>
      </Modal>
    </Container>
  );
};

export default ToDoList;
