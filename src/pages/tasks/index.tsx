import React from "react";
import { useSession } from "next-auth/react";
import {
  BiDotsVerticalRounded,
  BiEdit,
  BiTrash,
} from "react-icons/bi";
import { IoMdCheckmarkCircle } from "react-icons/io";
import {
  Box,
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
} from "@chakra-ui/react";

import { useTasks } from "@contexts/index";
import {TasksService} from "@services/Tasks";



const ToDoList: React.FC = () => {
  const { data: session } = useSession();
  const { tasks, handleUpdateTask } = useTasks();




  const handleDeleteTask = async (taskId: number) => {
    await TasksService.deleteExistingTask(taskId);
    handleUpdateTask();
    
  };

  console.log(tasks, "tasks lixosas")
  
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
          >
            <Radio
              isChecked={task.completed}
              mr={2}
              colorScheme="whatsapp"
              onClick={() =>
                handleTaskStatusChange(task)
              }
            />
            <Text flexGrow={1} isTruncated>
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
                  onClick={() =>
                    handleUpdateTask(task.id, {
                      description: "Teste",
                      completed: false,
                    })
                  }
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
    </Container>
  );
};

export default ToDoList;
