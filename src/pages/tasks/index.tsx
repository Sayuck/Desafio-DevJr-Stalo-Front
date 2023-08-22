import React from 'react';
import {BiDotsVerticalRounded, BiEdit, BiTrash} from 'react-icons/bi';
import {IoMdCheckmarkCircle} from 'react-icons/io';
import {
  Box,
  Checkbox,
  Container,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';

const tasks = [
  { id: 1, description: 'Task 1', completed: false },
  { id: 2, description: 'Task 2', completed: true },
  { id: 3, description: 'Task 3', completed: false },
  { id: 4, description: 'Task 4', completed: false },
  { id: 5, description: 'Task 5', completed: false },
  { id: 6, description: 'Task 6', completed: false },
  { id: 7, description: 'Task 7', completed: false },
  { id: 8, description: 'Task 8', completed: false },
  { id: 9, description: 'Task 9', completed: false },
  { id: 10, description: 'Task 10', completed: false },
  // Add more tasks here
];

const ToDoList: React.FC = () => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
   
      <Container  padding={20} position="-webkit-sticky" maxW="container.lg">
 

        <Box bg="white" padding={8} borderRadius="md" boxShadow="md" pb="70px" mt={12}>
          <Text>{new Date().toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}</Text>
          {tasks.map((task) => (
            <Flex key={task.id} align="center" mt={2}>
              <Checkbox isChecked={task.completed} mr={2} />
              <Text flexGrow={1} isTruncated>
                {task.description}
              </Text>
              <Menu>
                <MenuButton as={IconButton} icon={<BiDotsVerticalRounded color='gray'/>} variant="ghost" size="sm" />
                <MenuList>
                  <MenuItem icon={<BiEdit color='gray' fontSize={25} /> } >Editar</MenuItem>
                  <MenuItem icon={<IoMdCheckmarkCircle color='green' fontSize={25}/>} >Concluir</MenuItem>
                  <MenuItem icon={<BiTrash color='red' fontSize={25} />}>Excluir</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          ))}
          
        </Box>
        <Box bg="white" p={4} borderRadius="md" boxShadow="md" pb="70px" mt={12}>
        <Flex justify="space-between" mt={4}>
            <Text>Total de tarefas {completedTasks}/{totalTasks}</Text>
          </Flex>
        </Box>
      </Container>

  );
};

export default ToDoList;
