import { useState } from "react";
import { Box, Input, Button, List, ListItem, ListIcon, IconButton, Checkbox, Text } from "@chakra-ui/react";
import { FaTrash, FaPlus, FaCheckCircle } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const handleAddTask = () => {
    if (input.trim() !== "") {
      const newTask = {
        id: Date.now(),
        text: input,
        isCompleted: false,
      };
      setTasks([...tasks, newTask]);
      setInput("");
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, isCompleted: !task.isCompleted };
        }
        return task;
      }),
    );
  };

  return (
    <Box p={5}>
      <Box display="flex" mb={4}>
        <Input placeholder="Add a new task..." value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleAddTask()} />
        <Button ml={2} onClick={handleAddTask} leftIcon={<FaPlus />} colorScheme="red">
          Add
        </Button>
      </Box>
      <List spacing={3}>
        {tasks.map((task) => (
          <ListItem key={task.id} display="flex" alignItems="center">
            <Checkbox isChecked={task.isCompleted} onChange={() => toggleTaskCompletion(task.id)} mr={2}>
              <Text as={task.isCompleted ? "del" : "span"}>{task.text}</Text>
            </Checkbox>
            <IconButton aria-label="Delete task" icon={<FaTrash />} onClick={() => handleDeleteTask(task.id)} colorScheme="red" size="sm" ml="auto" />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;
