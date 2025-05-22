import { fetchTodos } from "@/services/todoService.";
import { useSuspenseQuery } from "@tanstack/react-query";
import { FlatList, StyleSheet, View } from "react-native";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { data } = useSuspenseQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id!.toString()}
        renderItem={({ item }) => <TodoItem {...item} />}
        removeClippedSubviews={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
  },
  todoListContainer: {
    padding: 10,
    minHeight: 50,
    width: "100%",
  },
});
