import { Todo } from "@/app/types";
import { Fragment } from "react";
import { Text, View } from "react-native";

type TodoListProps = {
  todos: Todo[];
};

export default function TodoList(props: TodoListProps) {
  return (
    <Fragment>
      {props.todos &&
        props.todos?.map((todo, key) => (
          <View
            className="flex flex-row align-center items-center p-4 m-8"
            key={todo.id}
          >
            <Text>{todo.title}</Text>
            <Text>{todo.description}</Text>
          </View>
        ))}
    </Fragment>
  );
}
