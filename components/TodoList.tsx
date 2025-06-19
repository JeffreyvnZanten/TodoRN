import { fetchTodos } from "@/services/todoService.";
import { useSuspenseQuery } from "@tanstack/react-query";
import { FlatList } from "react-native";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { data } = useSuspenseQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id!.toString()}
      renderItem={({ item }) => <TodoItem {...item} />}
      removeClippedSubviews={false}
    />
  );
}
