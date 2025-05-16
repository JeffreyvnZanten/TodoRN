import FloatingActionButton from "@/components/FloatingActionButton";
import TodoList from "@/components/TodoList";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Todo } from "./types";

export default function RootLayout() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch(
        "https://ac448k40gg84kosggk088wkg.jefvanzanten.dev/todos"
      );
      const data: Todo[] = await response.json();
      setTodos(data);
    };
    fetchTodos();
  }, []);

  return (
    <ThemeProvider value={DefaultTheme}>
      <TodoList todos={todos} />
      <FloatingActionButton />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
