import { Todo } from "@/types";
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

  function toggleCompleted() {
    console.log("Toggling completed");
    setTodo((prev) => ({ ...prev, isCompleted: prev.isCompleted }));
  }

  function toggleEditMode() {
    setIsEditing((prev) => !prev);
  }

  function handleChangeText(text: string) {
    setTodo((prev) => ({ ...prev, title: text }));
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
    minHeight: 50,
    width: "100%",
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
  },
  todoItemText: {
    verticalAlign: "middle",
  },
  todoInputText: {
    width: "100%",
  },
  todoCompleted: {
    textDecorationLine: "line-through",
  },
});
