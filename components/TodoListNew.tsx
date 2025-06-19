import { updateTodo } from "@/services/todoService.";
import { Todo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useCallback } from "react";
import { FlatList } from "react-native";
import TodoItem from "./TodoItemNew";

const TodoList = ({ todos }: { todos: Todo[] }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error("Error patching todo:", error);
    },
  });

  const handleToggle = useCallback(
    (id: number, currentCompleted: boolean) => {
      console.log("toggled", id);
      mutation.mutate({ id, isCompleted: !currentCompleted });
    },
    [mutation]
  );

  const handleUpdateTitle = useCallback(
    (id: number, title: string) => {
      console.log("updated title", id, title);
      mutation.mutate({ id, title });
    },
    [mutation]
  );

  return (
    <FlatList
      data={todos}
      keyExtractor={(item) => item.id!.toString()}
      renderItem={({ item }) => {
        return (
          <TodoItem
            key={item.id}
            todo={item}
            onToggle={() => handleToggle(item.id, item.isCompleted)}
            onUpdateTitle={handleUpdateTitle}
          />
        );
      }}
      removeClippedSubviews={false}
    />
  );
};

export default TodoList;
