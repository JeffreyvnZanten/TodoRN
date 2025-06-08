import { updateTodo } from "@/services/todoService.";
import { Todo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function TodoItem(props: Todo) {
  const [todo, setTodo] = useState<Todo>(props);
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  console.log("id: ", todo.id);

  const mutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      console.log("successfull patch");
    },
    onError: (error) => {
      console.log("Error met de patch", error);
    },
  });

  function toggleCompleted() {
    console.log("Toggling completed");
    const newCompleted = !todo.isCompleted;
    setTodo((prev) => ({ ...prev, isCompleted: newCompleted }));
    console.log("isCompleted:", newCompleted);
    mutation.mutate({ id: todo.id, isCompleted: newCompleted });
  }

  function toggleEditMode() {
    setIsEditing((prev) => !prev);
  }

  function handleChangeText(text: string) {
    setTodo((prev) => ({ ...prev, title: text }));
    mutation.mutate({ id: todo.id, title: text });
  }

  function finishEditing() {
    console.log("Finishing editing");
    setIsEditing(false);
  }

  return (
    <View style={styles.todoItemContainer} key={todo.id}>
      <BouncyCheckbox isChecked={todo.isCompleted} onPress={toggleCompleted} />
      {isEditing ? (
        <TextInput
          style={[
            styles.todoItemText,
            styles.todoInputText,
            todo.isCompleted && styles.todoCompleted,
          ]}
          value={todo.title}
          onChangeText={handleChangeText}
          onEndEditing={finishEditing}
        ></TextInput>
      ) : (
        <TouchableOpacity onPress={toggleEditMode}>
          <Text
            style={[
              styles.todoItemText,
              todo.isCompleted && styles.todoCompleted,
            ]}
          >
            {todo.title}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  todoItemContainer: {
    padding: 10,
    width: "100%",
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
  },
  todoItemText: {
    padding: 2,
  },
  todoInputText: {
    width: "100%",
  },
  todoCompleted: {
    textDecorationLine: "line-through",
  },
});
