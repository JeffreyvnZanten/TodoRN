import { dismissBottomSheet } from "@/services/bottomSheetService";
import { createTodo } from "@/services/todoService.";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

export default function CreateTodoForm() {
  const [title, setTitle] = useState<string>("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      console.log("successfull post");
      resetForm();
    },
    onError: (error) => {
      console.log("Error met de post", error);
    },
  });

  function resetForm() {
    setTitle("");
    dismissBottomSheet();
  }

  function handleSubmit() {
    const trimmed = title.trim();
    if (!trimmed) return;
    mutation.mutate({ title: trimmed, isCompleted: false });
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter a new todo"
        onSubmitEditing={handleSubmit}
        returnKeyType="done"
      />
      <Button title="Add" onPress={() => handleSubmit()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    borderWidth: 1,
    padding: 10,
  },
});
