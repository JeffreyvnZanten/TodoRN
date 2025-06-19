import { Todo } from "@/types";
import { memo, useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

type TodoItemProps = {
  todo: Todo;
  onToggle(id: number): void;
  onUpdateTitle(id: number, title: string): void;
};

const TodoItem = memo(({ todo, onToggle, onUpdateTitle }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(todo.title);

  const toggleCompleted = useCallback(
    () => onToggle(todo.id),
    [onToggle, todo.id]
  );

  const toggleEditMode = useCallback(() => {
    setIsEditing((edit) => !edit);
  }, [todo.title]);

  const finishEditing = useCallback(() => {
    onUpdateTitle(todo.id, draftTitle);
  }, [onUpdateTitle, todo.id, draftTitle]);

  const handleChangeText = useCallback((text: string) => {
    setDraftTitle(text);
  }, []);

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
          value={draftTitle}
          onChangeText={handleChangeText}
          onEndEditing={finishEditing}
        />
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
});

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

export default TodoItem;
