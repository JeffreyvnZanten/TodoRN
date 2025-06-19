import TodoList from "@/components/TodoListNew";
import { fetchTodos } from "@/services/todoService.";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Page() {
  const [isCompletedView, setIsCompletedView] = useState(false);
  const insets = useSafeAreaInsets();

  const { data } = useSuspenseQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const toggleIsCompletedView = () => {
    setIsCompletedView(!isCompletedView);
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.tabs}>
        <Pressable onPress={toggleIsCompletedView}>
          <Text style={[styles.tabItem, !isCompletedView && styles.activeTab]}>
            Onvoltooid
          </Text>
        </Pressable>
        <Pressable onPress={toggleIsCompletedView}>
          <Text style={[styles.tabItem, isCompletedView && styles.activeTab]}>
            Voltooid
          </Text>
        </Pressable>
      </View>
      {isCompletedView ? (
        <TodoList todos={data.filter((t) => t.isCompleted)} />
      ) : (
        <TodoList todos={data.filter((t) => !t.isCompleted)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "white",
    height: "100%",
    margin: 0,
    padding: 0,
  },
  tabs: {
    display: "flex",
    flexDirection: "row",
    gap: 2,
    paddingLeft: 8,
  },
  tabItem: {
    padding: 10,
  },
  activeTab: {
    paddingBottom: 2,
    borderColor: "blue",
    borderBottomWidth: 2,
  },
});
