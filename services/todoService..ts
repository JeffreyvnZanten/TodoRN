import { Todo } from "@/types";
import Constants from "expo-constants";

const { API_BASE_URL } = Constants.expoConfig!.extra as {
  API_BASE_URL: string;
};

export async function createTodo(newTodo: Todo): Promise<Todo> {
  const url = `${API_BASE_URL}/addtodo`;
  const res = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodo),
  });

  if (!res.ok) {
    throw new Error(`Server returned ${res.status}`);
  }

  const data = await res.json();
  return data;
}

export async function updateTodo(updatedTodo: Partial<Todo>): Promise<Todo> {
  const url = `${API_BASE_URL}/todos/${updatedTodo.id}`;

  const res = await fetch(url, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedTodo),
  });

  if (!res.ok) {
    throw new Error(`Server returned ${res.status}`);
  }

  const data = await res.json();
  return data;
}

export const fetchTodos = async (): Promise<Todo[]> => {
  try {
    const url = `${API_BASE_URL}/todos`;
    console.log("Fetching todos from", url);
    const response = await fetch(url);
    const todos = (await response.json()) as Todo[];
    console.log("Fetched todos:", todos);
    return todos;
  } catch (error: any) {
    return [];
  }
};
